<?php

use yii\db\Migration;

/**
 * Class m240111_034106_add_userId_column_to_drill_review
 */
class m240111_034106_add_userId_column_to_drill_review extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%drill_review}}', 'userId', $this->integer()->notNull()->defaultValue(0));

        $this->execute('UPDATE {{%drill_review}} SET "userId" = (SELECT "user_id" FROM {{%user_dictionary}} WHERE {{%user_dictionary}}.id = {{%drill_review}}."userWordId")');
        $this->execute('DELETE FROM {{%drill_review}} WHERE "userId" = 0');

        $this->addForeignKey(
            'drill_review_users_fk',
            '{{%drill_review}}',
            'userId',
            '{{%users}}',
            'id',
            'CASCADE',
            'NO ACTION'
        );
        $this->createIndex('drill_review_users_index', '{{%drill_review}}', 'userId');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('{{%drill_review}}', 'userId');
        $this->dropForeignKey('drill_review_users_fk', '{{%drill_review}}');

        return false;
    }
}
