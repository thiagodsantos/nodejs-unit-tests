import { MigrationInterface, QueryRunner } from "typeorm";

export class Make1658980129016 implements MigrationInterface {
    name = 'Make1658980129016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`make\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`make\``);
    }

}
