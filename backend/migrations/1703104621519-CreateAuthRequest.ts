import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthRequest1703104621519 implements MigrationInterface {
    name = 'CreateAuthRequest1703104621519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authRequests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" character varying NOT NULL, "promocode" character varying, CONSTRAINT "PK_fd6ac4dc8c4ab3d5eed814a9515" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "authRequests"`);
    }

}
