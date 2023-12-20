import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1703095326599 implements MigrationInterface {
    name = 'CreateUser1703095326599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "telegramId" integer NOT NULL, "is_bot" boolean, "first_name" character varying, "last_name" character varying, "username" character varying, "language_code" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
