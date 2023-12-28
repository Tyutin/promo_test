import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPhone1703765014173 implements MigrationInterface {
    name = 'UserPhone1703765014173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
