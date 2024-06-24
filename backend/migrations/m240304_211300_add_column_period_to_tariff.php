<?php

use yii\db\Migration;

/**
 * Class m240304_211300_add_column_period_to_tariff
 */
class m240304_211300_add_column_period_to_tariff extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%tariffs}}', 'period', $this->string()->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%tariffs}}', 'period');
    }
}
