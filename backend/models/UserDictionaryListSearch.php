<?php

namespace app\models;

use yii\base\Model;

class UserDictionaryListSearch extends UserDictionaryList
{
    public function rules()
    {
        return [
            [['name'], 'safe'],
        ];
    }

    public function scenarios()
    {
        return Model::scenarios();
    }
}
