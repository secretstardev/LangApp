<?php

use yii\db\Migration;

/**
 * Class m240215_232506_add_column_country_to_user
 */
class m240215_232506_add_column_country_to_user extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('users', 'country', $this->string()->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('users', 'country');
    }
}
