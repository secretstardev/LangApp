<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\enums;

class TariffPeriod extends Base
{
    const DAY = 'day';
    const MONTH = 'month';
    const YEAR = 'year';

    public static function options()
    {
        return [
            static::DAY => 'Day',
            static::MONTH => 'Month',
            static::YEAR => 'Year',
        ];
    }

    /**
     * @param string $value
     * @return int
     */
    public static function calculateTimeToBeAdded($value)
    {
        $days = 1;
        if ($value === static::MONTH) {
            $days = 30.437;
        } elseif ($value === static::YEAR) {
            $days = 365.244;
        }

        return (int) round(3600 * 24 * $days);
    }
}