<?php

use yii\db\Migration;

/**
 * Class m230417_101758_add_country_to_languages
 */
class m230417_101758_add_country_to_languages extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%languages}}', 'country', $this->string()->notNull()->defaultValue(''));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%languages}}', 'country');

        return false;
    }
}
