<?php

namespace app\models;

use app\base\db\ActiveQuery;

/**
 * This is the ActiveQuery class for [[Tariff]].
 *
 * @see UserTariff
 */
class TariffQuery extends ActiveQuery
{
    /**
     * @param string|array $value
     * @return $this
     */
    public function slug($value)
    {
        return $this->andWhere([$this->getColumnName('slug') => $value]);
    }

    /**
     * {@inheritdoc}
     * @return Tariff[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return Tariff|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
