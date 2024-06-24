<?php

namespace app\controllers;

use app\behaviors\PaidOnlyBehavior;
use app\components\Helpers;
use app\models\DictionaryListWordForm;
use app\models\DrillReview;
use app\models\UserDictionary;
use app\models\UserDictionaryList;
use app\models\UserDictionaryListSearch;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use yii\helpers\ArrayHelper;
use yii\rest\IndexAction;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use DateTime;
use DateTimeZone;
use Yii;

class DictionaryListController extends ActiveController
{
    public $modelClass = UserDictionaryList::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['access']['rules'] = [
            [
                'allow' => true,
                'actions' => ['index', 'view', 'create', 'update', 'delete', 'move', 'words'],
                'roles' => ['@'],
            ],
        ];

        $behaviors['paid'] = PaidOnlyBehavior::class;

        return $behaviors;
    }

    /**
     * {@inheritdoc}
     */
    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs['words'] = ['POST', 'GET', 'DELETE', 'HEAD'];
        $verbs['move'] = ['POST'];
        return $verbs;
    }

    /**
     * @return array
     */
    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['dataFilter'] = [
            'class' => ActiveDataFilter::class,
            'searchModel' => UserDictionaryListSearch::class,
            'queryOperatorMap' => [
                'LIKE' => 'ILIKE',
            ],
        ];
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    public function afterAction($action, $result)
    {
        // add virtual word list
        if ($action->id === 'index') {
            $result = $this->serializeData($result);
            $currentPage = (int) ArrayHelper::getValue($result, ['_meta', 'currentPage'], 1);
            if ($currentPage === 1) {
                $virtual = $this->generateVirtualItem();
                $items = ArrayHelper::getValue($result, ['items'], []);
                array_unshift($items, $virtual);
                ArrayHelper::setValue($result, ['items'], $items);
            }
        }
        return parent::afterAction($action, $result);
    }

    /**
     * @return array
     */
    protected function generateVirtualItem()
    {
        $now = new DateTime('now', new DateTimeZone(Yii::$app->timeZone));
        $countWordsToStudy = UserDictionary::find()
            ->user(Helpers::user())->drillDueBefore($now)
            ->count();

        $today = new DateTime('now', new DateTimeZone(Yii::$app->timeZone));
        $today->setTime(0, 0, 0, 1);
        $countWordsStudiedToday = DrillReview::find()
            ->user(Helpers::user())
            ->dateAfter($today)
            ->count();

        return [
            'id' => null,
            'name' => 'All',
            'type' => 'all',
            'countWordsToStudy' => $countWordsToStudy,
            'countWordsStudiedToday' => $countWordsStudiedToday,
        ];
    }

    public function actionCreate()
    {
        $model = new UserDictionaryList(['userId' => Yii::$app->user->id]);
        $model->load(Yii::$app->request->bodyParams, '');

        $valid = $model->saveOrUpdate();
        if ($model->hasErrors()) {
            return [
                'success' => false,
                'text' => 'Error while create word list.',
                'errors' => $model->errors,
            ];
        } elseif (!$valid) {
            return [
                'success' => false,
                'text' => 'Error while create word list.',
                'errors' => [],
            ];
        }

        return [
            'success' => true,
            'text' => 'New list created.',
        ];
    }

    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $this->checkAccess('update', $model);

        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        if ($model->saveOrUpdate() === false && !$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to update the object for unknown reason.');
        }

        return $model;
    }

    /**
     * @param IndexAction $action
     * @param mixed $filter
     * @return object|ActiveDataProvider
     * @throws \yii\base\InvalidConfigException
     * @throws ForbiddenHttpException
     */
    public function prepareDataProvider($action, $filter)
    {
        $requestParams = Yii::$app->getRequest()->getBodyParams();
        if (empty($requestParams)) {
            $requestParams = Yii::$app->getRequest()->getQueryParams();
        }

        $query = UserDictionaryList::find()->alias('t')->with(['user']);
        if (!empty($filter)) {
            $query->andWhere($filter);
        }

        $userId = Yii::$app->user->id;
        $query->user($userId);

        return Yii::createObject([
            'class' => ActiveDataProvider::class,
            'query' => $query,
            'pagination' => [
                'params' => $requestParams,
            ],
            'sort' => [
                'params' => $requestParams,
                'defaultOrder' => ['id' => SORT_DESC],
            ],
        ]);
    }

    public function actionMove($id)
    {
        $list = $this->findModel($id);
        $this->checkAccess('move', $list);

        $model = new DictionaryListWordForm([
            'scenario' => DictionaryListWordForm::SCENARIO_MOVE,
            'list' => $list,
        ]);
        $model->load(Yii::$app->request->bodyParams, '');
        if ($model->process()) {
            return [
                'success' => true,
                'text' => 'Words move to new list',
            ];
        } elseif ($model->hasErrors()) {
            return [
                'success' => false,
                'text' => 'Error while moving words to new list.',
                'errors' => $model->errors,
            ];
        }

        throw new ServerErrorHttpException('Unknown error.');
    }

    public function actionWords($id)
    {
        $list = $this->findModel($id);
        $this->checkAccess('words', $list);

        if (Yii::$app->request->isPost) {
            $model = new DictionaryListWordForm([
                'scenario' => DictionaryListWordForm::SCENARIO_DEFAULT,
                'list' => $list,
            ]);
            $model->load(Yii::$app->request->bodyParams, '');

            if ($model->process()) {
                return [
                    'success' => true,
                    'text' => 'Words added to list',
                ];
            } elseif ($model->hasErrors()) {
                return [
                    'success' => false,
                    'text' => 'Error while adding words to list.',
                    'errors' => $model->errors,
                ];
            }

            throw new ServerErrorHttpException('Unknown error.');
        } elseif (Yii::$app->request->isDelete) {
            $model = new DictionaryListWordForm([
                'scenario' => DictionaryListWordForm::SCENARIO_DELETE,
                'list' => $list,
            ]);
            $model->load(Yii::$app->request->bodyParams, '');

            if ($model->process()) {
                return [
                    'success' => true,
                    'text' => 'Words deleted from list',
                ];
            } elseif ($model->hasErrors()) {
                return [
                    'success' => false,
                    'text' => 'Error while delete words from list.',
                    'errors' => $model->errors,
                ];
            }

            throw new ServerErrorHttpException('Unknown error.');
        }

        return new ActiveDataProvider(['query' => $list->getWords()]);
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($model instanceof UserDictionaryList) {
            if ($model->userId != Yii::$app->user->id) {
                throw new ForbiddenHttpException();
            }
        }

        if ($action === 'delete') {
            if ($model->id === $model->user->defaultListId) {
                throw new BadRequestHttpException('You are not allowed to delete default list.');
            }
        }

        parent::checkAccess($action, $model, $params);
    }

    /**
     * @param int $id
     * @return UserDictionaryList
     * @throws NotFoundHttpException
     */
    public function findModel($id)
    {
        $model = call_user_func([$this->modelClass, 'findOne'], $id);
        if ($model === null) {
            throw new NotFoundHttpException();
        }
        return $model;
    }
}
