<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\base\traits;

use Yii;

/**
 * Class RuntimeCache
 * @package app\base\traits
 */
trait RuntimeCache
{
    /**
     * @var array to hold the runtime data
     */
    private $__runtimeData = [];
    private static $__staticData = [];

    /**
     * check if the data exist
     *
     * @param string $key
     * @return bool
     */
    public function hasRuntimeData($key)
    {
        return isset($this->__runtimeData[$key]) || array_key_exists($key, $this->__runtimeData);
    }

    /**
     * get the data stored inside the data cached
     *
     * @param string $key
     * @param null|mixed $default
     * @return mixed|null
     */
    public function getRuntimeData($key, $default = null)
    {
        return isset($this->__runtimeData[$key]) ? $this->__runtimeData[$key] : $default;
    }

    /**
     * Store the data into data cached
     *
     * @param string $key
     * @param mixed $value
     *
     * @return mixed|null
     */
    public function setRuntimeData($key, $value)
    {
        return $this->__runtimeData[$key] = $value;
    }

    /**
     * Short cut for reading runtime cached data.
     *
     * @param string $key
     * @param callback $callback
     * @param null|mixed $default
     *
     * @return mixed|null
     */
    public function getOrSetRuntimeData($key, $callback, $default = null)
    {
        if (!$this->hasRuntimeData($key)) {
            $data = call_user_func($callback);
            $this->setRuntimeData($key, $data);
        }
        return $this->getRuntimeData($key, $default);
    }

    /**
     * reset the runtime cache
     * return $this
     */
    public function flushRuntimeData()
    {
        $this->__runtimeData = [];
        return $this;
    }

    /**
     * check if the static data exist
     *
     * @param string $key
     * @return bool
     */
    public function hasStaticData($key)
    {
        return isset(static::$__staticData[$key]) || array_key_exists($key, static::$__staticData);
    }

    /**
     * get the data stored inside the static data cached
     *
     * @param string $key
     * @param null|mixed $default
     * @return mixed|null
     */
    public function getStaticData($key, $default = null)
    {
        return isset(static::$__staticData[$key]) ? static::$__staticData[$key] : $default;
    }

    /**
     * Store the data into static data cached
     *
     * @param string $key
     * @param mixed $value
     *
     * @return mixed|null
     */
    public function setStaticData($key, $value)
    {
        return static::$__staticData[$key] = $value;
    }

    /**
     * Shortcut for reading static cached data.
     *
     * @param string $key
     * @param callback $callback
     * @param null|mixed $default
     *
     * @return mixed|null
     */
    public function getOrSetStaticData($key, $callback, $default = null)
    {
        if (!$this->hasStaticData($key)) {
            Yii::beginProfile($key);
            $data = call_user_func($callback);
            $this->setStaticData($key, $data);
            Yii::endProfile($key);
        }
        return $this->getStaticData($key, $default);
    }

    /**
     * reset the static cache
     * return $this
     */
    public function flushStaticData()
    {
        static::$__staticData = [];
        return $this;
    }
}
