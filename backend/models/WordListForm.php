<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\models;

use yii\base\InvalidConfigException;
use yii\base\Model;
use Yii;

/**
 * For updating word's list
 */
class WordListForm extends Model
{
    public $ids = [];

    /**
     * @var UserDictionary
     */
    private $_word;

    public function init()
    {
        parent::init();

        if (!isset($this->_word)) {
            throw new InvalidConfigException('$word must be defined !');
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
                'targetClass' => UserDictionaryList::class,
                'targetAttribute' => 'id',
                'allowArray' => true,
                'filter' => [
                    'userId' => $this->_word->user_id,
                ],
            ],
        ];
    }

    public function attributeLabels()
    {
        return [
            'ids' => 'List ID(s)'
        ];
    }

    /**
     * @return bool
     */
    public function update()
    {
        if ($this->validate()) {
            $this->_word->listIdsItems = (array) $this->ids;
            return $this->_word->save(false);
        }

        return false;
    }

    public function delete()
    {
        return $this->_word->resetDictionaryLists();
    }

    protected function setWord(UserDictionary $value)
    {
        $this->_word = $value;
    }
}