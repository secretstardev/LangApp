<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\controllers;

use app\base\helpers\Json;
use app\components\Helpers;
use app\models\Tariff;
use app\models\User;
use app\enums\UserTariff;
use yii\helpers\ArrayHelper;
use Yii;

class TariffController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $availableToEveryone = ['options', 'index'];
        $behaviors['authenticator']['optional'] = $availableToEveryone;

        $behaviors['access']['rules'] = [
            [
                'allow' => true,
                'actions' => ['index'],
                'roles' => ['?', '@'],
            ],
        ];

        return $behaviors;
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'options' => [
                'class' => 'yii\rest\OptionsAction',
            ],
        ];
    }

    public function actionIndex()
    {
        $country = $this->getCountryCode();
        $currency = $this->getCurrencyCode();

        $tariffList = [];
        /** @var Tariff $tariff */
        foreach (Tariff::find()->all() as $tariff) {
            $item = [
                'id' => $tariff->id,
                'slug' => $tariff->slug,
                'amount' => $tariff->getAmountByCountryCurrency($country, $currency),
            ];
            if ($tariff->slug == UserTariff::FREE) {
                $item['penaltyMinAmount'] = $tariff->getPenaltyMinAmount($country, $currency);
                $item['penaltyDefaultAmount'] = $tariff->getPenaltyDefaultAmount($country, $currency);
                $item['penaltyMaxAmount'] = $tariff->getPenaltyMaxAmount($country, $currency);
            }
            $tariffList[] = $item;
        }

        return [
            'country' => $country,
            'currency' => $currency,
            'tariffList' => $tariffList,
        ];
    }

    protected function getDefaultCurrency()
    {
        return ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
    }

    /**
     * @return string
     */
    protected function getCurrencyCode()
    {
        /** @var User $user */
        if (($user = Yii::$app->user->identity) instanceof User) {
            return $user->currency;
        }

        $countryCode = $this->getCountryCode();
        if ($countryCode !== 'XX') {
            $path = Yii::getAlias('@app/data/country-currency-map.json');
            if (file_exists($path) && is_file($path)) {
                $json = @file_get_contents($path);
                if (Json::validate($json)) {
                    $data = Json::decode($json);
                    $value = ArrayHelper::getValue($data, [$countryCode, 'currency']);
                    $supported = ArrayHelper::getValue(Yii::$app->params, ['currency', 'supported', 'items'], []);
                    if (!empty($value) && in_array($value, $supported)) {
                        return strtoupper($value);
                    }
                }
            }
        }

        return $this->getDefaultCurrency();
    }

    /**
     * @return string
     */
    protected function getCountryCode()
    {
        $value = Helpers::getCountryCodeFromRequestHeader();
        return empty($value) ? 'XX' : $value;
    }
}
