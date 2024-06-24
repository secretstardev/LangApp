<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\base\helpers;

class Json extends \yii\helpers\Json
{
    /**
     * Validate is the given string is JSON
     * @param string|mixed $content
     * @return bool
     */
    public static function validate($content)
    {
        if (!is_string($content) || empty($content)) {
            return false;
        }

        $firstChar = substr($content, 0, 1);
        $lastChar = substr($content, -1, 1);

        return ($firstChar === '{' && $lastChar === '}')
            || ($firstChar === '[' && $lastChar === ']');
    }
}