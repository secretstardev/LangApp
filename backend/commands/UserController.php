<?php

namespace app\commands;

use app\components\Helpers;
use app\enums\UserTariff;
use app\models\ActivityInterim;
use app\models\ActivityStats;
use app\models\User;
use Throwable;
use yii\console\Controller;
use yii\helpers\BaseConsole;
use yii\helpers\Json;
use DateTime;
use Yii;

/**
 * Class UserController
 */
class UserController extends Controller
{
    /**
     * This action is responsible for generating activity statistics for users.
     */
    public function actionProcessActivityStats(): void
    {
        $query = User::find()->alias('u')
            ->andWhere(['>=', '[[u]].[[paidUntilDateTime]]', Helpers::dateToSql(time())]);

        Yii::info('SQL: ' . $query->createCommand()->getRawSql());

        /** @var User $user */
        foreach ($query->each() as $user) {
            Yii::info('Processing User #' . $user->id);
            try {
                $finishedDay = (new DateTime())->setTimezone($user->getDateTimeZone())->modify('-1 day')->setTime(0, 0, 0);
                $lastProcessed = $user->getLastActivityStatDate();

                Yii::info('Timezone: ' . $user->timezone . ', finished day: ' . $finishedDay->format('Y-m-d') . ', previous processed date: ' . $lastProcessed->format('Y-m-d'));

                if ($lastProcessed >= $finishedDay) {
                    continue;
                }

                for ($dayToProcess = DateTime::createFromImmutable($lastProcessed)->modify('+1 day')->setTime(0, 0, 0); $dayToProcess <= $finishedDay; $dayToProcess->modify('+1 day')) {
                    $dayToProcessDate = $dayToProcess->format('Y-m-d');

                    Yii::info('Processing Date: ' . $dayToProcessDate);
                    $transaction = Yii::$app->db->beginTransaction();
                    try {
                        $stat = ActivityStats::factory($user, $dayToProcessDate);
                        $stat->save();

                        // Yii::info('Data: ' . Json::encode($stat->attributes));
                        if ($stat->hasErrors()) {
                            Yii::error(Json::encode($stat->errors));
                            continue;
                        }

                        // process penalty
                        if ($stat->is_penalty_received === true) {
                            Yii::info('Failed to hit goal, processActivityPenalty(' . $dayToProcessDate . ')');

                            if (!$user->processActivityPenalty($dayToProcessDate)) {
                                Yii::info('Failed to charge in processActivityPenalty()');
                            }
                        }

                        //-- update last activity stat date into dataJson
                        $user->setLastActivityStatDate($dayToProcess);
                        $user->save(false, ['dataJson']);
                        if ($user->hasErrors()) {
                            Yii::error(Json::encode($user->errors));
                        }

                        $fromTime = (clone $dayToProcess)->setTime(0, 0, 0)->getTimestamp();
                        $toTime = (clone $dayToProcess)->setTime(23, 59, 59)->getTimestamp();

                        // delete interim activity
                        ActivityInterim::deleteAll([
                            'AND',
                            ['=', '[[user_id]]', $user->id],
                            ['BETWEEN', '[[date]]', Helpers::dateToSql($fromTime), Helpers::dateToSql($toTime)],
                        ]);

                        $transaction->commit();
                    } catch (\Exception $e) {
                        $transaction->rollBack();
                        Yii::error($e);
                    }
                }

                Yii::info($dayToProcess->format(DateTime::ATOM));
                Yii::info('User #' . $user->id . ' has been processed');
            } catch (Throwable $e) {
                Yii::error("Failed to generate activity statistic for user $user->id: {$e->__toString()}");
            }
        }
    }
}
