<?php

use yii\db\Migration;

/**
 * Class m240304_222904_drop_column_countWordsToStudy_from_word_list
 */
class m240304_222904_drop_column_countWordsToStudy_from_word_list extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->dropColumn('{{%user_dictionary_list}}', 'countWordsToStudy');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->addColumn('{{%user_dictionary_list}}', 'countWordsToStudy', $this->integer()->notNull()->defaultValue(0));
    }
}
