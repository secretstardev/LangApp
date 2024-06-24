<?php

namespace app\controllers;

use app\behaviors\PaidOnlyBehavior;
use app\components\Helpers;
use app\models\UserDictionarySearch;
use app\models\DictionaryWord;
use app\models\Mnemonics;
use app\models\UserDictionary;
use app\models\WordListForm;
use Yii;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use yii\db\ArrayExpression;
use yii\db\Expression;
use yii\helpers\ArrayHelper;
use yii\rest\IndexAction;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

class DictionaryController extends ActiveController
{
    public $modelClass = UserDictionary::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['access']['rules'] = [
            [
                'allow' => true,
                'actions' => ['index', 'view', 'create', 'lists'],
                'roles' => ['@'],
            ],
            [
                'allow' => true,
                'actions' => ['update', 'delete'],
                'roles' => ['admin'],
            ],
        ];

        $behaviors['paid'] = PaidOnlyBehavior::class;

        return $behaviors;
    }

    /**
     * @return array
     */
    public function actions()
    {
        $actions = parent::actions();

        unset($actions['index']);
        unset($actions['create']);

        return $actions;
    }

    public function actionIndex()
    {
        $requestParams = Yii::$app->getRequest()->getBodyParams();
        if (empty($requestParams)) {
            $requestParams = Yii::$app->getRequest()->getQueryParams();
        }

        $listId = null;
        $filter = ArrayHelper::getValue($requestParams, ['filter']);
        if (is_array($filter) && isset($filter['listId'])) {
            $listId = ArrayHelper::remove($filter, 'listId');
            ArrayHelper::setValue($requestParams, ['filter'], $filter);
        }

        $query = UserDictionary::find();
        if (!empty($listId)) {
            $query->list($listId);
        }

        $filter = null;
        $dataFilter = Yii::createObject([
            'class' => ActiveDataFilter::class,
            'searchModel' => UserDictionarySearch::class,
        ]);
        if ($dataFilter->load($requestParams)) {
            $filter = $dataFilter->build();
            if ($filter === false) {
                return $dataFilter;
            }
        }

        if (!empty($filter)) {
            $query->andWhere($filter);
        }

        $userId = Yii::$app->user->id;
        $query->andWhere(['user_dictionary.user_id' => $userId]);

        if (isset($requestParams['expand']) && is_string($requestParams['expand'])) {
            $expand = preg_split('/\s*,\s*/', $requestParams['expand'], -1, PREG_SPLIT_NO_EMPTY);
        } else {
            $expand = [];
        }
        if (in_array('dictionaryWord', $expand)) {
            $query->with('dictionaryWord');
        }

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

    /**
     * @return array
     * @throws \yii\base\InvalidConfigException
     */
    public function actionCreate()
    {
        $transaction = Yii::$app->db->beginTransaction();
        $params = Yii::$app->getRequest()->getBodyParams();

        /** @var UserDictionary $word */
        $word = UserDictionary::find()->where(['original_word' => $params['wordValue'], 'user_id' => Yii::$app->user->id, 'type' => $params['wordType']])->one();

        if ($word == null) {
            $word = new UserDictionary();
            $word->user_id = Yii::$app->user->id;
            $word->type = $params['wordType'];
            $word->dictionary_word_id = $params['wordId'];
            $word->original_word = $params['wordValue'];
            $word->translate_word = $params['meaningValue'];
            $word->date = Helpers::dateToSql(time());
            $word->context = $params['contextText'];
            $word->url = $params['contextUrl'];
            $word->drill_due = Helpers::dateToSql(time());
        } else {
            $word->translate_word = $params['meaningValue'];
            $word->context = $params['contextText'];
            $word->url = $params['contextUrl'];
        }
        $word->save();
        if ($word->hasErrors()) {
            $transaction->rollBack();

            return [
                'success' => false,
                'text' => 'Error while adding word to your dictionary.',
                'errors' => $word->errors,
            ];
        }

        if ($word->type == DictionaryWord::TYPE_JAPANESE_WORD) {
            preg_match_all('/[\x{4E00}-\x{9FFF}]/u', $word->original_word, $tmp);
            $kanjiListValues = $tmp[0];
            if (count($kanjiListValues) > 0) {
                $kanjiListInDb = UserDictionary::find()->where(['original_word' => $kanjiListValues])->andWhere(['user_id' => $word->user_id, 'type' => DictionaryWord::TYPE_JAPANESE_KANJI])->indexBy('original_word')->all();
                /** @var DictionaryWord[] $dictionaryWordList */
                $dictionaryWordList = DictionaryWord::find()->where(['&&', 'query', new ArrayExpression($kanjiListValues)])->andWhere(['type' => DictionaryWord::TYPE_JAPANESE_KANJI])->all();

                foreach ($kanjiListValues as $kanjiValue) {
                    $kanjiInDb = $kanjiListInDb[$kanjiValue] ?? null;
                    if ($kanjiInDb == null) {
                        $dictionaryWord = null;
                        foreach ($dictionaryWordList as $item) {
                            if (in_array($kanjiValue, $item->query->getValue())) {
                                $dictionaryWord = $item;
                                break;
                            }
                        }

                        if ($dictionaryWord != null) {
                            $workout_progress_card = [
                                "due" => time(),
                            ];

                            $kanjiInDb = new UserDictionary();
                            $kanjiInDb->user_id = $word->user_id;
                            $kanjiInDb->type = DictionaryWord::TYPE_JAPANESE_KANJI;
                            $kanjiInDb->dictionary_word_id = $dictionaryWord->id;
                            $kanjiInDb->original_word = $kanjiValue;
                            $kanjiInDb->translate_word = $dictionaryWord->getMeaningForLangList(['en']); // TODO: use lang list for user
                            $kanjiInDb->date = date('Y-m-d');
                            $kanjiInDb->context = $params['contextText'];
                            $kanjiInDb->url = $params['contextUrl'];
                            $kanjiInDb->drill_due = Helpers::dateToSql(time());
                            //$kanjiInDb->mnemonic = null;
                            $kanjiInDb->save(false);
                            if ($kanjiInDb->hasErrors()) {
                                $transaction->rollBack();

                                return [
                                    'success' => false,
                                    'text' => 'Error while adding kanji from the word to your dictionary.',
                                    'errors' => $kanjiInDb->errors,
                                ];
                            }
                        }
                    }
                }
            }
        }

        $transaction->commit();

        return [
            'success' => true,
            'text' => 'Added to your dictionary.',
        ];
    }

    public function actionQueryOne()
    {
        $filter = Yii::$app->request->queryParams;

        $userId = Yii::$app->user->id;
        $query = UserDictionary::find()->joinWith('dictionaryWord')
            ->where(['user_dictionary.user_id' => $userId, 'user_dictionary.type' => DictionaryWord::TYPE_JAPANESE_WORD])
            ->andWhere(['or like', 'user_dictionary.original_word', explode(',', $filter['word'])])->all();

        $query1 = Mnemonics::find()->joinWith('mnemonicsUsers')
            ->where(['mnemonics.word' => explode(',', $filter['mnemonic'])])
            ->orderBy(['mnemonics.rating' => SORT_DESC])->all();

        return [
            'words' => $query,
            'mnemonics' => $query1,
        ];
    }

    /**
     * @return ActiveDataProvider
     */
    public function actionAll()
    {
        $filter = Yii::$app->request->queryParams;

        $userId = Yii::$app->user->id;
        $query = UserDictionary::find()->joinWith(['dictionaryWord', 'mnemonic'])
            ->where(['user_dictionary.user_id' => $userId])
            ->andWhere(new Expression("user_dictionary.workout_progress_card->>'due' <= '" . time() . "'"));

        if (array_key_exists('type', $filter) && $filter['type'] != 'undefined' && $filter['type'] != '') {
            if (strcasecmp('kanji', $filter['type']) == 0) {
                $type = DictionaryWord::TYPE_JAPANESE_KANJI;
            } else {
                $type = DictionaryWord::TYPE_JAPANESE_WORD;
            }

            $query->andWhere(['user_dictionary.type' => (int) $type]);
        }

        $query->orderBy(new Expression("user_dictionary.workout_progress_card->>'due' ASC"));

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => false,
        ]);
    }

    /**
     * @return ActiveDataProvider
     */
    public function actionComboStudy()
    {
        $requestParams = Yii::$app->getRequest()->getBodyParams();
        if (empty($requestParams)) {
            $requestParams = Yii::$app->getRequest()->getQueryParams();
        }

        $userId = Yii::$app->user->id;
        $query = UserDictionary::find()->joinWith(['dictionaryWord', 'mnemonic'])
            ->where(['user_dictionary.user_id' => $userId])
            ->andWhere(new Expression("user_dictionary.workout_progress_card->>'due' <= '" . time() . "'"));

        if (isset($requestParams['filter']['type'])) {
            $query->andWhere(['user_dictionary.type' => $requestParams['filter']['type']]);
        }

        $query->orderBy(new Expression("user_dictionary.workout_progress_card->>'due' ASC"));
        $query->limit = 10;

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => false,
        ]);
    }

    /**
     * @return bool[]
     * @throws \Throwable
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\db\StaleObjectException
     */
    public function actionDeleteSelect()
    {
        // TODO: check is user has access to it
        return;
        $filter = Yii::$app->getRequest()->getBodyParams();

        $dictionaries = UserDictionary::find()->where(['id' => $filter])->all();
        foreach ($dictionaries as $dictionary) {
            $dictionary->delete();
        }

        return ['done' => true];
    }

    public function actionLists($id)
    {
        $word = $this->findModel($id);
        $this->checkAccess('lists', $word);

        if (Yii::$app->request->isPut || Yii::$app->request->isPost) {
            $model = new WordListForm(['word' => $word]);
            $model->load(Yii::$app->request->bodyParams, '');

            if ($model->update()) {
                return [
                    'success' => true,
                    'text' => 'Word\'s lists updated',
                ];
            } elseif ($model->hasErrors()) {
                return [
                    'success' => false,
                    'text' => 'Error while updating lists of word',
                    'errors' => $model->errors,
                ];
            }

            throw new ServerErrorHttpException('Unknown error.');
        } elseif (Yii::$app->request->isDelete) {
            $model = new WordListForm(['word' => $word]);
            if ($model->delete()) {
                return [
                    'success' => true,
                    'text' => 'Word\'s lists updated',
                ];
            } elseif ($model->hasErrors()) {
                return [
                    'success' => false,
                    'text' => 'Error while updating lists of word',
                    'errors' => $model->errors,
                ];
            }
        }

        return new ActiveDataProvider(['query' => $word->getLists()]);
    }

    /**
     * @param int $id
     * @return UserDictionary
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
