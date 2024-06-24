<?php

use yii\db\Migration;

/**
 * Class m240129_031424_create_table_tariffs
 */
class m240129_031424_create_table_tariffs extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%tariffs}}', [
            'id' => $this->primaryKey(),
            'slug' => $this->string()->notNull()->unique(),
            'amountJson' => $this->json()->notNull(),
        ]);

        $this->addColumn('{{%users}}', 'tariffAmount', $this->money()->defaultValue(null));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%users}}', 'tariffAmount');
        $this->dropTable('{{%tariffs}}');
    }
}
