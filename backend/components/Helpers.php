<?php

namespace app\components;

use app\models\User;
use Yii;
use yii\web\Request;

class Helpers
{
    public static function dateToSql($unixTime)
    {
        return date(\DateTime::ATOM, $unixTime);
    }

    public static function dateToUnix($sqlDate)
    {
        return strtotime($sqlDate);
    }

    public static function formatDateField($model, $field)
    {
        return \Yii::$app->formatter->asDatetime($model->$field, 'php:' . \DateTime::ATOM);
        //return \Yii::$app->formatter->asDatetime($model->$field);
    }

    public static function isAdmin()
    {
        return \Yii::$app->user->can('admin');
    }

    public static function formatMoney($money)
    {
        $money = number_format($money, 1, ',', ' ');
        $money = str_replace(',0', '', $money);

        return $money;
    }

    /**
     * @return User
     */
    public static function user()
    {
        /** @var User $user */
        $user = Yii::$app->user->identity;

        return $user;
    }

    /**
     * Try to get Country Code from Cloud Flare Header
     * @return string|null
     */
    public static function getCountryCodeFromRequestHeader()
    {
        /** @var Request $request */
        if (($request = Yii::$app->get('request', false)) instanceof Request) {
            $value = $request->getHeaders()->get('CF-IPCountry');
            if (!empty($value)) {
                return strtoupper($value);
            }
        }

        return null;
    }
}
