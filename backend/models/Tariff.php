<?php

namespace app\models;

use app\components\CurrencyConverter;
use app\enums\TariffPeriod;
use app\enums\UserTariff;
use yii\helpers\ArrayHelper;
use Yii;

/**
 * This is the model class for table "tariffs".
 *
 * @property int $id
 * @property string $slug
 * @property string $amountJson
 * @property string $period
 */
class Tariff extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tariffs';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['slug', 'amountJson'], 'required'],
            [['amountJson'], 'safe'],
            [['slug', 'period'], 'string', 'max' => 255],
            [['period'], 'in', 'range' => TariffPeriod::values()],
            [['slug'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'Slug',
            'amountJson' => 'Amount Json',
        ];
    }

    /**
     * @param string $country
     * @param string $currency
     * @return float|int|mixed
     * @throws \Exception
     */
    public function getAmountByCountryCurrency($country, $currency)
    {
        $country = strtoupper($country);
        $currency = strtoupper($currency);

        if (is_array($this->amountJson)) {
            // try get from $country_$currency or XX_$currency
            $key = sprintf('%s_%s', $country, $currency);
            if (array_key_exists($key, $this->amountJson)) {
                return ArrayHelper::getValue($this->amountJson, [$key]);
            } else {
                $key = sprintf('%s_%s', 'XX', $currency);
                if (array_key_exists($key, $this->amountJson)) {
                    return ArrayHelper::getValue($this->amountJson, [$key]);
                }
            }

            // try get from $country_$defaultCurrency or XX_$defaultCurrency then convert
            $defaultCurrency = ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
            $key = sprintf('%s_%s', $country, $defaultCurrency);
            if (array_key_exists($key, $this->amountJson)) {
                $baseAmount = ArrayHelper::getValue($this->amountJson, [$key]);
            } else {
                $key = sprintf('%s_%s', 'XX', $defaultCurrency);
                if (array_key_exists($key, $this->amountJson)) {
                    $baseAmount = ArrayHelper::getValue($this->amountJson, [$key]);
                }
            }

            if (isset($baseAmount)) {
                return CurrencyConverter::convertWithRound($baseAmount, time(), $defaultCurrency, $currency);
            }
        }

        //TODO: throw error or ?
        return 99999999;
    }

    /**
     * @param string $country
     * @param string $currency
     * @return float
     * @throws \Exception
     */
    public function getPenaltyMinAmount($country, $currency)
    {
        $country = strtoupper($country);
        $currency = strtoupper($currency);
        $defaultCurrency = ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
        $baseAmount = ArrayHelper::getValue(Yii::$app->params, ['tariff', 'penaltyMinAmount'], 1);
        return CurrencyConverter::convertWithRound($baseAmount, time(), $defaultCurrency, $currency);
    }

    /**
     * @param string $country
     * @param string $currency
     * @return float
     * @throws \Exception
     */
    public function getPenaltyDefaultAmount($country, $currency)
    {
        $country = strtoupper($country);
        $currency = strtoupper($currency);
        $defaultCurrency = ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
        $baseAmount = ArrayHelper::getValue(Yii::$app->params, ['tariff', 'penaltyDefaultAmount'], 3);
        return CurrencyConverter::convertWithRound($baseAmount, time(), $defaultCurrency, $currency);
    }

    /**
     * @param string $country
     * @param string $currency
     * @return float
     * @throws \Exception
     */
    public function getPenaltyMaxAmount($country, $currency)
    {
        $country = strtoupper($country);
        $currency = strtoupper($currency);
        $defaultCurrency = ArrayHelper::getValue(Yii::$app->params, ['currency', 'default'], 'USD');
        $baseAmount = ArrayHelper::getValue(Yii::$app->params, ['tariff', 'penaltyMaxAmount'], 500);
        return CurrencyConverter::convertWithRound($baseAmount, time(), $defaultCurrency, $currency);
    }

    /**
     * @return array
     */
    public static function getValidSlugs()
    {
        $slugs = static::find()->select(['slug'])->column();
        $slugs[] = UserTariff::FREE;

        return $slugs;
    }

    /**
     * @param string $slug
     * @return Tariff|null
     */
    public static function findBySlug($slug)
    {
        return static::find()->slug($slug)->limit(1)->one();
    }

    /**
     * {@inheritdoc}
     * @return TariffQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new TariffQuery(get_called_class());
    }
}
