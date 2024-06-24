<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\models;

use yii\base\InvalidConfigException;
use yii\base\Model;
use Yii;

/**
 * For adding Words into List
 */
class DictionaryListWordForm extends Model
{
    const SCENARIO_MOVE = 'move';
    const SCENARIO_DELETE = 'delete';

    public $ids = [];
    public $newListId;

    /**
     * @var UserDictionaryList
     */
    private $_list;

    public function init()
    {
        parent::init();

        if (!isset($this->_list)) {
            throw new InvalidConfigException('$list must be defined !');
        }
    }

    public function rules()
    {
        return [
            ['ids', 'required'],
            [
                'ids',
                'exist',
                'skipOnError' => true,
                'targetClass' => UserDictionary::class,
                'targetAttribute' => 'id',
                'allowArray' => true,
                'filter' => [
                    'user_id' => $this->_list->userId,
                ],
            ],
            // if moving to another list
            ['newListId', 'required', 'on' => [static::SCENARIO_MOVE]],
            [
                'newListId',
                'exist',
                'skipOnError' => true,
                'targetClass' => UserDictionaryList::class,
                'targetAttribute' => 'id',
                'filter' => [
                    'userId' => $this->_list->userId,
                ],
                'on' => [static::SCENARIO_MOVE]
            ],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[static::SCENARIO_DELETE] = ['ids'];
        return $scenarios;
    }

    public function attributeLabels()
    {
        return [
            'ids' => 'Word ID(s)'
        ];
    }

    /**
     * @return bool
     */
    public function process()
    {
        if ($this->validate()) {
           if ($this->scenario === static::SCENARIO_MOVE) {
               return $this->processMove();
           } elseif ($this->scenario === static::SCENARIO_DELETE) {
               return $this->processDelete();
           } else {
               return $this->processDefault();
           }
        }

        return false;
    }

    /**
     * @return bool
     */
    protected function processMove()
    {
        $newList = UserDictionaryList::findOne($this->newListId);
        if ($newList === null) {
            return false;
        }

        $valid = true;
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $ids = (array) $this->ids;
            // get selected words in the lists
            $words = UserDictionary::find()
                ->andWhere(['id' => $ids])
                ->list($this->_list)
                ->all();

            foreach ($words as $word) {
                // remove from old list
                $word->listIdsItems = array_diff($word->listIdsItems, [$this->_list->id]);
                // add in new list
                $word->listIdsItems[] = $newList->id;
                $word->listIdsItems = array_unique($word->listIdsItems);
                $valid = $valid && $word->save(false);
            }
            $valid ? $transaction->commit() : $transaction->rollBack();
        } catch (\Exception $e) {
            $valid = false;
            $transaction->rollBack();
            Yii::error($e);
        }

        return $valid;
    }

    /**
     * @return bool
     */
    protected function processDelete()
    {
        $valid = true;
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $ids = (array) $this->ids;
            // get selected words in the lists
            $words = UserDictionary::find()
                ->andWhere(['id' => $ids])
                ->list($this->_list)
                ->all();

            foreach ($words as $word) {
                // remove from old list
                $word->listIdsItems = array_diff($word->listIdsItems, [$this->_list->id]);
                $valid = $valid && $word->save(false);
            }
            $valid ? $transaction->commit() : $transaction->rollBack();
        } catch (\Exception $e) {
            $valid = false;
            $transaction->rollBack();
            Yii::error($e);
        }

        return $valid;
    }

    /**
     * @return bool
     */
    protected function processDefault()
    {
        $valid = true;
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $ids = (array) $this->ids;
            $words = UserDictionary::find()->andWhere(['id' => $ids])->all();
            foreach ($words as $word) {
                $word->listIdsItems[] = $this->_list->id;
                $word->listIdsItems = array_unique($word->listIdsItems);
                $valid = $valid && $word->save(false);
            }
            $valid ? $transaction->commit() : $transaction->rollBack();
        } catch (\Exception $e) {
            $valid = false;
            $transaction->rollBack();
            Yii::error($e);
        }

        return $valid;
    }

    protected function setList(UserDictionaryList $value)
    {
        $this->_list = $value;
    }
}