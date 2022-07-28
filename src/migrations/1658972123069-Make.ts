import { MigrationInterface, QueryRunner } from "typeorm";

export class Make1658972123069 implements MigrationInterface {
    name = 'Make1658972123069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`make\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`make\` DROP COLUMN \`id\``);
    }

}
