<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use app\components\CurrencyConverter;
use yii\console\Controller;

class TestController extends Controller
{
    /**
     * Test the CurrencyConverter::round function
     * @return void
     */
    public function actionRound()
    {
        $amounts = [
            92833, 89845,
            3955, 3788, 3888, 4001,
            296, 178, 198, 365, 488,
            57, 99, 94, 88, 12, 96,
            15.77, 34.76, 55.87, 12.54,
            3.89, 3.44, 5.78, 9.21,
            0.89, 0.45, 0.68, 0.44,
        ];

        foreach ($amounts as $amount) {
            echo $amount . ' --> ' . CurrencyConverter::round($amount) . "\n";
        }

        echo "\n\nThree decimal currency test: \n";
        $amounts = [5.123, 5.124, 5.125, 5.126];
        foreach ($amounts as $amount) {
            echo $amount . ' --> ' . round($amount, 2) * 1000 . "\n";
        }
    }
}
