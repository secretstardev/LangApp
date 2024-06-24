<?php

namespace app\models;

use yii\base\Model;
use app\enums\TransactionStatus;

class TransactionSearch extends Transaction
{
    public function rules()
    {
        return [
            [['id', 'userId', 'isCommon', 'isPartner', 'isRealMoney', 'fromInvitedUserId', 'parentTransactionId'], 'integer'],
            [['money'], 'number'],
            [['comment', 'addedDateTime', 'dataJson'], 'safe'],
            [['name'], 'string'],
            [['status'], 'in', 'range' => array_values(TransactionStatus::options())],
        ];
    }

    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }
}
