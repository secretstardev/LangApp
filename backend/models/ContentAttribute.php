<?php

namespace app\models;

use Yii;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * Class ContentAttribute
 *
 * [[Table properties]]
 * @property int $id
 * @property int $contentId
 * @property int $userId
 * @property int $isStudied
 * @property bool $isHidden
 *
 * [[Extra properties]]
 * @property Content $content
 * @property User $user
 */
class ContentAttribute extends ActiveRecord
{
    public const SCENARIO_CREATE = 'create';
    public const SCENARIO_UPDATE = 'update';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%content_attribute}}';
    }

    /**
     * {@inheritDoc}
     */
    public function scenarios(): array
    {
        return [
            self::SCENARIO_CREATE => ['contentId', 'isStudied', 'isHidden'],
            self::SCENARIO_UPDATE => ['isStudied', 'isHidden'],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function rules(): array
    {
        return [
            ['contentId', 'required'],
            ['contentId', 'integer'],
            ['contentId', 'exist', 'targetRelation' => 'content'],
            ['contentId', 'unique', 'targetAttribute' => ['contentId', 'userId']],
            ['isHidden', 'boolean'],
            ['isHidden', 'default', 'value' => false],
            ['isStudied', 'integer'],
            ['isStudied', 'default', 'value' => 0],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function beforeValidate(): bool
    {
        if (!parent::beforeValidate()) {
            return false;
        }

        $this->userId = Yii::$app->user->id;

        return true;
    }

    public function getContent(): ActiveQuery
    {
        return $this->hasOne(Content::class, ['id' => 'contentId']);
    }

    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'userId']);
    }

    /**
     * @return ContentAttributeQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new ContentAttributeQuery(get_called_class());
    }
}
