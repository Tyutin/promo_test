import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthEntities1703119155772 implements MigrationInterface {
    name = 'AuthEntities1703119155772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "telegramId" integer NOT NULL, "is_bot" boolean, "first_name" character varying, "last_name" character varying, "username" character varying, "language_code" character varying, "ref_promocode" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionToken" character varying NOT NULL, "expires" character varying NOT NULL, "userId" uuid, "authRequestId" uuid, CONSTRAINT "UQ_8b5e2ec52e335c0fe16d7ec3584" UNIQUE ("sessionToken"), CONSTRAINT "REL_e083ee6e42193f8cfe8a88461a" UNIQUE ("authRequestId"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authRequests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires" character varying NOT NULL, "ref_promocode" character varying, CONSTRAINT "PK_fd6ac4dc8c4ab3d5eed814a9515" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_e083ee6e42193f8cfe8a88461a0" FOREIGN KEY ("authRequestId") REFERENCES "authRequests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_e083ee6e42193f8cfe8a88461a0"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`DROP TABLE "authRequests"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
