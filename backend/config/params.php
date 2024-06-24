<?php

$params = [
    'adminEmail' => 'support@localhost',
    'noreplyEmail' => 'support@localhost',
    'siteName' => 'LangApp',
    'fromName' => 'LangApp',
    'hostName' => 'localhost:8080',
    'baseUrl' => 'https://localhost:8080',
    'square' => [
        'env' => 'sandbox',
        'sandbox' => [
            'applicationId' => 'sandbox-sq0idb-1hwdCIUEVLJIdMOtcBwPzA',
            'accessToken' => 'EAAAEJAsAvmex3OV2BPvh_2_KeaVo9Zr0_yjUnDcJLtkrkqFZNS-NDtizhCJFxhy',
            'locationId' => 'LY033JNJZ5BMP',
        ],
        'production' => [
            'applicationId' => '',
            'accessToken' => '',
            'locationId' => '',
        ],
    ],
    'stripe' => [
        'env' => 'test',
        'test' => [
            'publishableKey' => 'pk_test_51GYZxmCMGBLulUmlAdpyDglDbQ1T3fVSu2r25WFSO5WQRdKipbNQhi9fyjJOvizfLd4MkygVGpRo6o6hV8E2IQQw00tASHPk8S',
            'secretKey' => 'sk_test_51GYZxmCMGBLulUml2EK1yMgPYYZZRnh0OoHPnTrXkVMBPsA90kaZQ3eJ57abRlxbxAxpOljZwWkIalc8lbu0vQ8y001oEzqubv',
            'types' => ['card'], // Possible types: https://stripe.com/docs/api/payment_methods/customer_list#list_customer_payment_methods-type
        ],
        'production' => [
            'publishableKey' => '',
            'secretKey' => '',
            'types' => ['card'], // Possible types: https://stripe.com/docs/api/payment_methods/customer_list#list_customer_payment_methods-type
        ],
    ],
    'currency' => [
        'default' => 'USD',
        'supported' => [
            'items' => ['USD', 'EUR', 'JPY'],
            'symbols' => [
                //'RUB' => '₽',
                'USD' => '$',
                //'EUR' => '€',
                ////'JPY' => '円',
                'JPY' => '¥',
                //'KRW' => '₩',
                ////'CNY' => '元'
                //'CNY' => '¥',
            ],
        ],
    ],
    'tariff' => [
        'penaltyMinAmount' => 1,
        'penaltyDefaultAmount' => 3,
        'penaltyMaxAmount' => 500,
    ],
    'openExchangeRatesAppId' => '6e1f7ce1ae6445cd9611f4fbe6ba417c', // free API key for dev
];

if (file_exists(__DIR__ . '/params-local.php')) {
    include __DIR__ . '/params-local.php';
}

return $params;
