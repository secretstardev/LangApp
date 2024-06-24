<?php

namespace app\models;

use app\behaviors\ArrayExpressionBehavior;
use yii\db\ActiveRecord;
use yii\db\ArrayExpression;

/**
 * This is the model class for table "{{%user_dictionary}}".
 *
 * @property int $id
 * @property int $user_id
 * @property int $type
 * @property int $dictionary_word_id
 * @property string $original_word
 * @property string $translate_word
 * @property string $date
 * @property string $context
 * @property string $url
 * @property int $mnemonic_id
 * @property string $drill_card
 * @property string $drill_progress
 * @property string $drill_due
 * @property string $drill_last
 * @property ArrayExpression $listIds
 *
 * @property DictionaryWord $dictionaryWord
 * @property User $user
 * @property Mnemonics $mnemonic
 * @property UserDictionaryList $lists
 */
class UserDictionary extends ActiveRecord
{
    public $listIdsItems;

    public function behaviors()
    {
        return [
            'array' => [
                'class' => 'app\behaviors\ArrayExpressionBehavior',
                'defaultType' => ArrayExpressionBehavior::TYPE_INTEGER,
                'attributes' => [
                    'listIds' => 'listIdsItems'
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user_dictionary}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'dictionary_word_id', 'original_word', 'date'], 'required'],
            [['user_id', 'type', 'dictionary_word_id'], 'integer'],
            [['date'], 'safe'],
            [['context'], 'string'],
            [['original_word', 'translate_word', 'url'], 'string', 'max' => 255],
            [['dictionary_word_id'], 'exist', 'skipOnError' => true, 'targetClass' => DictionaryWord::class,
                'targetAttribute' => ['dictionary_word_id' => 'id'], ],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class,
                'targetAttribute' => ['user_id' => 'id'], ],
            [['mnemonic_id'], 'exist', 'skipOnError' => true, 'targetClass' => Mnemonics::class,
                'targetAttribute' => ['mnemonic_id' => 'id'], ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'type' => 'Type',
            'dictionary_word_id' => 'Dictionary Word ID',
            'original_word' => 'Original Word',
            'translate_word' => 'Translate Word',
            'date' => 'Date',
            'context' => 'Context',
            'url' => 'Url',
            'mnemonic_id' => 'Mnemonic ID',
        ];
    }

    public function extraFields()
    {
        return [
            'lists',
        ];
    }

    /**
     * @return bool
     */
    public function resetDictionaryLists($save = true)
    {
        $this->user->autoCreateDictionaryList();
        $listId = $this->user->defaultListId;
        $this->listIdsItems = [$listId];
        if ($save) {
            return $this->save(false);
        }
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDictionaryWord()
    {
        return $this->hasOne(DictionaryWord::class, ['id' => 'dictionary_word_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getMnemonic()
    {
        return $this->hasOne(Mnemonics::class, ['id' => 'mnemonic_id']);
    }

    /**
     * @return UserDictionaryListQuery
     */
    public function getLists()
    {
        $query = UserDictionaryList::find()
            ->id($this->listIdsItems)
            ->user($this->user_id);
        $query->multiple = true;

        return $query;
    }

    public function afterFind()
    {
        // if the listIds is empty, reset to default list
        if ($this->listIds instanceof ArrayExpression && $this->listIds->count() <= 0) {
            $this->resetDictionaryLists();
        }

        parent::afterFind();
    }

    public function beforeSave($insert)
    {
        if (!is_array($this->listIdsItems) || count($this->listIdsItems) == 0) {
            $this->resetDictionaryLists(false);
        }

        return parent::beforeSave($insert);
    }

    /**
     * {@inheritdoc}
     * @return UserDictionaryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UserDictionaryQuery(get_called_class());
    }
}
