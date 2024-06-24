<?php

use yii\db\Migration;

/**
 * Class m240110_023233_change_content_attribute_is_studied
 */
class m240110_023233_change_content_attribute_is_studied extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->alterColumn('{{%content_attribute}}', 'isStudied', 'SMALLINT USING CASE WHEN [[isStudied]] THEN 0 ELSE 1 END');
        $this->alterColumn('{{%content_attribute}}', 'isStudied', $this->smallInteger()->notNull()->defaultValue(0));

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->alterColumn('{{%content_attribute}}', 'isStudied', 'BOOL USING CASE WHEN [[isStudied]] = 0 THEN false ELSE true END');
        $this->alterColumn('{{%content_attribute}}', 'isStudied', $this->boolean()->notNull()->defaultValue(false));
    }
}
