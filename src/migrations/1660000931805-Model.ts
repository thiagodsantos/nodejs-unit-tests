import { MigrationInterface, QueryRunner } from "typeorm";

export class Model1660000931805 implements MigrationInterface {
    name = 'Model1660000931805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`model\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`id_make\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`model\` ADD CONSTRAINT \`FK_b3b7166eb276a946eccfd4dcc38\` FOREIGN KEY (\`id_make\`) REFERENCES \`make\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`model\` DROP FOREIGN KEY \`FK_b3b7166eb276a946eccfd4dcc38\``);
        await queryRunner.query(`DROP TABLE \`model\``);
    }

}
