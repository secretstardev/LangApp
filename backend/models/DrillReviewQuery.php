<?php

namespace app\models;

use app\base\db\ActiveQuery;
use DateTime;

/**
 * This is the ActiveQuery class for [[DrillReview]].
 *
 * @see DrillReview
 */
class DrillReviewQuery extends ActiveQuery
{
    /**
     * @param string|DateTime $value
     * @return $this
     */
    public function dateAfter($value)
    {
        if ($value instanceof DateTime) {
            $value = $value->format(DATE_ATOM);
        }
        return $this->andWhere(['>=', $this->getColumnName('date'), $value]);
    }

    /**
     * @param User|int|string|array $value
     * @return DrillReviewQuery|$this
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
     * @return DrillReview[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return DrillReview|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
