<?php
/**
 * @author RYU Chua <me@ryu.my>
 */

namespace app\models;

use yii\db\ActiveQuery;

class ContentAttributeQuery extends ActiveQuery
{
    /**
     * @param User|int|string|array $value
     * @return ContentAttributeQuery|$this
     */
    public function user($value)
    {
        if ($value instanceof User) {
            return $this->andWhere(['[[userId]]' => $value->id]);
        }

        return $this->andWhere(['[[userId]]' => $value]);
    }

    /**
     * {@inheritdoc}
     * @return ContentAttribute[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return ContentAttribute|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}