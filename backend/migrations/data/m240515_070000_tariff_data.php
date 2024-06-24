<?php

use yii\db\Migration;
use app\models\Tariff;
use app\models\User;

class m240515_070000_tariff_data extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->truncateTable('{{%tariffs}}');
        $this->execute('delete from migration_data where "version" like :suffix;', [':suffix' => '%_tariff_data']);

        $tariff = new Tariff();
        $tariff->slug = 'monthly';
        $tariff->period = 'month';
        $tariff->amountJson = ["XX_USD" => 20];
        $tariff->save();

        $tariff = new Tariff();
        $tariff->slug = 'free';
        $tariff->period = 'day';
        $tariff->amountJson = ["XX_USD" => 0];
        $tariff->save();

        $tariff = new Tariff();
        $tariff->slug = 'annual';
        $tariff->period = 'year';
        $tariff->amountJson = ["XX_USD" => 200];
        $tariff->save();

        // Find all users with empty tariffAmount or tariffPeriod
        /** @var User[] $users */
        $users = User::find()->where(['or', ['tariffAmount' => null], ['tariffPeriod' => null]])->each();
        foreach ($users as $user) {
            // Save to trigger autoFillTariffData
            $user->save(false);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->truncateTable('{{%tariffs}}');
    }
}
