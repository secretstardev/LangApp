<?php

namespace app\models;

use app\base\traits\RuntimeCache;
use yii\db\Expression;
use DateTime;
use DateTimeZone;
use Yii;

/**
 * This is the model class for table "user_dictionary_list".
 *
 * @property int $id
 * @property int $userId
 * @property string $name
 *
 * @property int $countWordsToStudy
 * @property int $countWordsStudiedToday
 *
 * @property User $user
 * @property User[] $users
 */
class UserDictionaryList extends \yii\db\ActiveRecord
{
    use RuntimeCache;

    public const TYPE_USER = 'user';
    public const TYPE_DEFAULT = 'default';

    public $type;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user_dictionary_list}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['userId'], 'required'],
            [['userId'], 'default', 'value' => null],
            [['userId'], 'integer'],
            [['name', 'type'], 'string'],
            [['name'], 'required'],
            [['type'], 'in', 'range' => [static::TYPE_USER, static::TYPE_DEFAULT]],
            [['userId'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['userId' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'userId' => 'User',
            'name' => 'Name',
        ];
    }

    public function fields()
    {
        return [
            'id',
            'name',
            'type' => function () {
                if ($this->user && $this->user->defaultListId === $this->id) {
                    return static::TYPE_DEFAULT;
                }
                return static::TYPE_USER;
            },
            'countWordsToStudy',
            'countWordsStudiedToday',
        ];
    }

    public function extraFields()
    {
        return [
            'words'
        ];
    }

    /**
     * @return int
     */
    public function getCountWordsToStudy()
    {
        $key = __METHOD__;
        $countMap = $this->getOrSetStaticData($key, function () use ($key) {
            $data = [];
            $now = new DateTime('now', new DateTimeZone(Yii::$app->timeZone));
            $rows = UserDictionary::find()->alias('t')
                ->select([
                    'listId' => new Expression('UNNEST([[t]].[[listIds]])'),
                    'total' => new Expression('COUNT([[t]].[[id]])'),
                ])
                ->user($this->userId)
                ->drillDueBefore($now)
                ->asArray()
                ->groupBy('listId')
                ->indexBy('listId')
                ->all();

            foreach ($rows as $id => $row) {
                $data[$id] = (int) $row['total'];
            }
            return $data;
        });

        return isset($countMap[$this->id]) ? $countMap[$this->id] : 0;
    }

    /**
     * @return int
     */
    public function getCountWordsStudiedToday()
    {
        $key = __METHOD__;
        $countMap = $this->getOrSetStaticData($key, function () use ($key) {
            $data = [];
            $today = new DateTime('now', new DateTimeZone(Yii::$app->timeZone));
            $today->setTime(0, 0, 0, 1);

            $rows = DrillReview::find()->alias('t')
                ->joinWith(['userWord w'])
                ->select([
                    'listId' => new Expression('UNNEST([[w]].[[listIds]])'),
                    'total' => new Expression('COUNT([[t]].[[id]])'),
                ])
                ->user($this->userId)
                ->dateAfter($today)
                ->asArray()
                ->groupBy('listId')
                ->indexBy('listId')
                ->all();

            foreach ($rows as $id => $row) {
                $data[$id] = (int) $row['total'];
            }
            return $data;
        });

        return isset($countMap[$this->id]) ? $countMap[$this->id] : 0;
    }

    /**
     * this function will handle "type" and update user "defaultListId"
     * @return bool
     */
    public function saveOrUpdate()
    {
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $valid = $this->save();
            if (!empty($this->type) && $this->type === static::TYPE_DEFAULT) {
                $this->user->defaultListId = $this->id;
                $valid = $valid && $this->user->save(false, ['defaultListId']);
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
    public function removeAllWords()
    {
        $valid = true;
        $transaction = Yii::$app->db->beginTransaction();
        try {
            /** @var UserDictionary $word */
            foreach ($this->getWords()->each() as $word) {
                $word->listIdsItems = array_diff($word->listIdsItems, [$this->id]);
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
     * @return UserDictionaryQuery
     */
    public function getWords()
    {
        $query = UserDictionary::find()->list($this);
        $query->multiple = true;
        return $query;
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'userId']);
    }

    public function beforeDelete()
    {
        if (parent::beforeDelete()) {
            return $this->removeAllWords();
        }

        return false;
    }

    /**
     * {@inheritdoc}
     * @return UserDictionaryListQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UserDictionaryListQuery(get_called_class());
    }
}
