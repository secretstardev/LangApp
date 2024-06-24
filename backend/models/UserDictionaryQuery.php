<?php

namespace app\models;

use app\base\db\ActiveQuery;
use yii\db\Expression;
use DateTime;

/**
 * This is the ActiveQuery class for [[UserDictionary]].
 *
 * @see UserDictionary
 */
class UserDictionaryQuery extends ActiveQuery
{
    /**
     * @param string|DateTime $value
     * @return $this
     */
    public function drillDueBefore($value)
    {
        if ($value instanceof DateTime) {
            $value = $value->format(DATE_ATOM);
        }
        return $this->andWhere(['<=', $this->getColumnName('drill_due'), $value]);
    }

    /**
     * @param string|DateTime $value
     * @return $this
     */
    public function drillDueAfter($value)
    {
        if ($value instanceof DateTime) {
            $value = $value->format(DATE_ATOM);
        }
        return $this->andWhere(['>=', $this->getColumnName('drill_due'), $value]);
    }

    /**
     * @param User|int|string|array $value
     * @return UserDictionaryQuery|$this
     */
    public function user($value)
    {
        if ($value instanceof User) {
            return $this->andWhere([$this->getColumnName('user_id') => $value->id]);
        }

        return $this->andWhere([$this->getColumnName('user_id') => $value]);
    }

    /**
     * @param UserDictionaryList|int|string|array $value
     * @return UserDictionaryQuery|$this
     */
    public function list($value)
    {
        if ($value instanceof UserDictionaryList) {
            $value = $value->id;
        }

        return $this->andWhere(new Expression(sprintf(':id = ANY(%s)', $this->getColumnName('listIds')), [':id' => $value]));
    }

    /**
     * {@inheritdoc}
     * @return UserDictionary[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return UserDictionary|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
