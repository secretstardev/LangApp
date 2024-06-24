<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "drill_review".
 *
 * @property int $id
 * @property int $userWordId
 * @property string $date
 * @property int $answer
 * @property int $oldInterval
 * @property float $oldEaseFactor
 * @property int $newInterval
 * @property float $newEaseFactor
 * @property string $drills
 * @property int $userId
 *
 * @property UserDictionary $userWord
 */
class DrillReview extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'drill_review';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['userWordId'], 'required'],
            [['userWordId', 'answer', 'oldInterval', 'newInterval'], 'default', 'value' => null],
            [['userWordId', 'answer', 'oldInterval', 'newInterval'], 'integer'],
            [['date', 'drills'], 'safe'],
            [['oldEaseFactor', 'newEaseFactor'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'userWordId' => 'User Word ID',
            'date' => 'Date',
            'answer' => 'Answer',
            'oldInterval' => 'Old Interval',
            'oldEaseFactor' => 'Old Ease Factor',
            'newInterval' => 'New Interval',
            'newEaseFactor' => 'New Ease Factor',
            'drills' => 'Drills',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery|UserDictionaryQuery
     */
    public function getUserWord()
    {
        return $this->hasOne(UserDictionary::class, ['id' => 'userWordId']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'userId']);
    }

    /**
     * {@inheritdoc}
     * @return DrillReviewQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new DrillReviewQuery(get_called_class());
    }
}
