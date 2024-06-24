<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\enums;

class LanguageLevel extends Base
{
    const NEW = 'new';
    const BEGINNER = 'beginner';
    const INTERMEDIATE = 'intermediate';
    const UPPER_INTERMEDIATE = 'upper-intermediate';
    const ADVANCED = 'advanced';

    /**
     * @return array
     */
    public static function options()
    {
        return [
            static::NEW => 'New',
            static::BEGINNER => 'Beginner',
            static::INTERMEDIATE => 'Intermediate',
            static::UPPER_INTERMEDIATE => 'Upper Intermediate',
            static::ADVANCED => 'Advanced',
        ];
    }

    /**
     * @param string $code
     * @return int
     */
    public static function getInteger($code)
    {
        switch ($code) {
            case static::NEW:
                return 5;
            case static::BEGINNER:
                return 4;
            case static::INTERMEDIATE:
                return 3;
            case static::UPPER_INTERMEDIATE:
                return 2;
            case static::ADVANCED:
                return 1;
        }

        return -1;
    }
}