<?php

use app\models\UserDictionary;
use yii\db\Migration;
use yii\helpers\Json;

/**
 * Class m240110_073906_create_table_dictionary_list
 */
class m240110_073906_create_table_dictionary_list extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%user_dictionary_list}}', [
            'id' => $this->primaryKey(),
            'userId' => $this->integer()->notNull(),
            'name' => $this->text()->notNull(),
        ]);
        $this->addForeignKey(
            'fk-user_dictionary_list-userId-users-id',
            '{{%user_dictionary_list}}',
            'userId',
            '{{%users}}',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addColumn('{{%user_dictionary}}', 'listIds', "int[] DEFAULT '{}'::int[]");
        $this->addColumn('{{%users}}', 'defaultListId', $this->integer()->null());

        $this->addForeignKey(
            'fk-users-defaultListId-user_dictionary_list-id',
            '{{%users}}',
            'defaultListId',
            '{{%user_dictionary_list}}',
            'id',
            'SET NULL',
            'CASCADE'
        );

        // - ensure all UserDictionary fill with default list
        $query = UserDictionary::find()->alias('t')
            ->with(['user'])->orderBy(['[[t]].[[id]]' => SORT_ASC]);
        /** @var UserDictionary $word */
        foreach ($query->each(250) as $word) {
            echo sprintf("ID: %d, Existing List IDs: %s\n", $word->id, Json::encode($word->listIdsItems));
            if (!$word->resetDictionaryLists()) {
                throw new \yii\base\Exception('Something wrong when creating default list, please try again later.');
            }
            echo sprintf("ID: %d, New List IDs: %s\n", $word->id, Json::encode($word->listIdsItems));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-users-defaultListId-user_dictionary_list-id', '{{%users}}');
        $this->dropColumn('{{%users}}', 'defaultListId');
        $this->dropColumn('{{%user_dictionary}}', 'listIds');

        $this->dropForeignKey('fk-user_dictionary_list-userId-users-id', '{{%user_dictionary_list}}');
        $this->dropTable('{{%user_dictionary_list}}');
    }
}
