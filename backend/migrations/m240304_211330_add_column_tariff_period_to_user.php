<?php

use yii\db\Migration;

/**
 * Class m240304_211330_add_column_tariff_period_to_user
 */
class m240304_211330_add_column_tariff_period_to_user extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('users', 'tariffPeriod', $this->string()->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('users', 'tariffPeriod');
    }
}
