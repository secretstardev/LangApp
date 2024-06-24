<?php

namespace app\enums;

class TransactionStatus extends Base
{
    public const FAILED = 0;
    public const SUCCESS = 1;
    public const PROCESSING = 2;

    /**
     * @return array
     */
    public static function options()
    {
        return [
            static::FAILED => 'failed',
            static::SUCCESS => 'success',
            static::PROCESSING => 'processing',
        ];
    }

    /**
     * @param int $code
     * @return string
     */
    public static function getString($code)
    {
        $options = static::options();
        return isset($options[$code]) ? $options[$code] : 'unknown';
    }

    /**
     * @param string $status
     * @return int
     */
    public static function getInteger($status)
    {
        switch (strtolower($status)) {
            case 'failed':
                return static::FAILED;
            case 'success':
                return static::SUCCESS;
            case 'processing':
                return static::PROCESSING;
        }

        return -1; // Unknown status
    }
}
