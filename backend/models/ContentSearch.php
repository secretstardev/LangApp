<?php

namespace app\models;

use yii\base\Model;

class ContentSearch extends Content
{
    public $isStudied;
    public $isHidden;
    public $categoryId;

    /**
     * {@inheritDoc}
     */
    public function attributes(): array
    {
        return array_merge(parent::attributes(), [
            'isStudied',
            'isHidden',
            '{{content_attribute}}.[[isStudied]]',
            '{{content_attribute}}.[[isHidden]]',
        ]);
    }

    /**
     * {@inheritDoc}
     */
    public function rules(): array
    {
        return [
            [['type', 'status', 'length', 'level', 'deleted'], 'integer'],
            [['text', 'cleanText'], 'string'],
            [['tagsJson','categoryId'], 'safe'],
            [['title', 'sourceLink', 'format'], 'string', 'max' => 255],
            [['isHidden'], 'boolean'],
            [['isStudied'], 'integer'],
            [
                ['{{content_attribute}}.[[isHidden]]'],
                'filter',
                'filter' => function ($value) {
                    if ($value == false) {
                        return [false, null];
                    }

                    return $value;
                },
            ],
        ];
    }

    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }
}
