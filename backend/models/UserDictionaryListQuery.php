<?php

namespace app\models;

use app\base\db\ActiveQuery;

/**
 * This is the ActiveQuery class for [[UserDictionaryList]].
 *
 * @see UserDictionaryList
 */
class UserDictionaryListQuery extends ActiveQuery
{
    /**
     * @param User|int|string|array $value
     * @return UserDictionaryListQuery|$this
     */
    public function user($value)
    {
        if ($value instanceof User) {
            return $this->andWhere([$this->getColumnName('userId') => $value->id]);
        }

        return $this->andWhere([$this->getColumnName('userId') => $value]);
    }

    /**
     * {@inheritdoc}
     * @return UserDictionaryList[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return UserDictionaryList|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
