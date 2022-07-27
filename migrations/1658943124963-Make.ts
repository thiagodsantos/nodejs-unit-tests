import { MigrationInterface, QueryRunner } from "typeorm";

export class Make1658943124963 implements MigrationInterface {
    name = 'Make1658943124963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`make\` (\`id\` varchar(255) NOT NULL DEFAULT '8b9e4d7c-7718-4c1c-9c2a-65d5e2ab5af0', \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`make\``);
    }

}
