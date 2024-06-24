<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\base\helpers;

class StringHelper extends \yii\helpers\StringHelper
{
    /**
     * @param string $value
     * @param bool $trim
     * @param bool $skipEmpty
     * @return array
     */
    public static function explodeByComma($value, $trim = true, $skipEmpty = true)
    {
        if ($trim && $skipEmpty) {
            return preg_split('/\s*,\s*/', $value, null, PREG_SPLIT_NO_EMPTY);
        }

        if ($trim) {
            return preg_split('/\s*,\s*/', $value);
        }

        return explode(',', $value);
    }
}