<?php

use yii\db\Migration;

/**
 * Class m240120_222922_add_countWordsToStudy_column_to_user_dictionary_list
 */
class m240120_222922_add_countWordsToStudy_column_to_user_dictionary_list extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%user_dictionary_list}}', 'countWordsToStudy', $this->integer()->notNull()->defaultValue(0));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
       $this->dropColumn('{{%user_dictionary_list}}', 'countWordsToStudy');
    }
}
