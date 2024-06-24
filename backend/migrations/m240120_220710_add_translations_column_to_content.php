<?php

use yii\db\Migration;

/**
 * Class m240120_220710_add_translations_column_to_content
 */
class m240120_220710_add_translations_column_to_content extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%content}}', 'translationsJson', $this->json()->notNull()->defaultValue('{}'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%content}}', 'translationsJson');
    }
}
