<?php

namespace app\components;

use app\base\helpers\Json;
use yii\base\InvalidConfigException;
use yii\base\NotSupportedException;
use yii\helpers\ArrayHelper;
use Yii;

class CurrencyConverter
{
    /**
     * @param string $fromCurrency
     * @param string $toCurrency
     * @param int $unixTime
     * @return float
     * @throws InvalidConfigException
     * @throws NotSupportedException
     */
    protected static function getRatesFromOpenExchangeRates($fromCurrency, $toCurrency, $unixTime)
    {
        Yii::warning(Yii::$app->params);
        $appId = ArrayHelper::getValue(Yii::$app->params, ['openExchangeRatesAppId']);
        if (empty($appId)) {
            throw new InvalidConfigException('Please defined openExchangeRatesAppId in config.');
        }

        $date = date('Y-m-d', $unixTime);
        $cacheKey = sprintf('currency-rates-OpenExchangeRates-%s-from-currency-%s-v1', $date, $fromCurrency);
        $rates = Yii::$app->cache->getOrSet($cacheKey, function () use ($unixTime, $date, $appId, $fromCurrency) {
            $params = ['app_id' => $appId, 'base' => $fromCurrency];

            $url = sprintf('https://openexchangerates.org/api/historical/%s.json?%s', urlencode($date), http_build_query($params));
            if ($unixTime >= time()) {
                $url = sprintf('https://openexchangerates.org/api/latest.json?%s', http_build_query($params));
            }

            $result = @file_get_contents($url);
            if (Json::validate($result)) {
                $data = Json::decode($result);
                return ArrayHelper::getValue($data, ['rates'], []);
            }

            return [];
        }, 3600);

        if (isset($rates[$toCurrency])) {
            return $rates[$toCurrency];
        } else {
            throw new NotSupportedException(sprintf('Convert Currency From %s to %s is not supported (for date %s)', $fromCurrency, $toCurrency, $date));
        }
    }

    protected static function getRatesForDateRub($fromCurrency, $unixTime)
    {
        $date = date('d/m/Y', $unixTime);
        $rates = Yii::$app->cache->getOrSet('currency-rates-' . $date . '-5', function () use ($date) {
            $rawResult = file_get_contents('http://www.cbr.ru/scripts/XML_daily.asp?date_req=' . $date);
            $tmpResult = json_decode(json_encode(simplexml_load_string($rawResult)), true);
            $result = [];
            if (!isset($tmpResult['Valute'])) {
                return [];
            }
            foreach ($tmpResult['Valute'] as $item) {
                $value = floatval(str_replace(',', '.', $item['Value']));
                if (isset($item['Nominal']) && $item['Nominal'] != '1') {
                    $value /= $item['Nominal'];
                }
                $result[$item['CharCode']] = $value;
            }

            return $result;
        });

        if (isset($rates[$fromCurrency])) {
            return $rates[$fromCurrency];
        } else {
            throw new \RuntimeException('From currency ' . $fromCurrency . ' is not supported (for date ' . $date . ')');
        }
    }

    public static function round($money)
    {
        if ($money > 1000) {
            $up = ($money % 100) ? (int) round($money - ($money % 100) + 100, 4) : $money;
        } elseif ($money > 100) {
            $up = ($money % 10) ? (int) round(($money - ($money % 10) + 10), 4) : $money;
        } elseif ($money > 1) {
            $up = $money * 10.0;
            $up = ($up % 10) ? (int) ($up - ($up % 10) + 10) : $up;
            $up = $up / 10.0;
        } elseif ($money > 0) {
            $up = $money * 100.0;
            $up = ($up % 10) ? (int) ($up - ($up % 10) + 10) : $up;
            $up = $up / 100.0;
        }

        if (isset($up) && $money !== 0) {
            $diff = round((($up - $money) / $money) * 100, 2);
            $money = $diff < 5 ? $up : $money;
        }

        return round($money, 4);
    }

    public static function convert($money, $unixTime, $fromCurrency, $toCurrency)
    {
        if ($fromCurrency == $toCurrency) {
            return $money;
        }

        if ($toCurrency == 'RUB') {
            $rate = self::getRatesForDateRub($fromCurrency, $unixTime);
        } else {
            $supported = ArrayHelper::getValue(Yii::$app->params, ['currency', 'supported', 'items'], []);
            if (!in_array($fromCurrency, $supported)) {
                throw new NotSupportedException(sprintf('Convert From %s is not supported !', $fromCurrency));
            }

            $rate = self::getRatesFromOpenExchangeRates($fromCurrency, $toCurrency, $unixTime);
        }

        return $money * $rate;
    }

    public static function convertWithRound($money, $unixTime, $fromCurrency, $toCurrency)
    {
        $amount = self::convert($money, $unixTime, $fromCurrency, $toCurrency);
        return self::round($amount);
    }
}
