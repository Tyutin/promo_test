import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndPromocodesRelations1703511459802 implements MigrationInterface {
    name = 'UserAndPromocodesRelations1703511459802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promocodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "commission" integer NOT NULL DEFAULT '15', "ownerId" uuid, CONSTRAINT "PK_cfd49e54a2ddfbc02636f8f2904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "ref_promocode"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "banned" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refPromocodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6a1a82971ced4a662a15d448004" UNIQUE ("refPromocodeId")`);
        await queryRunner.query(`ALTER TABLE "promocodes" ADD CONSTRAINT "FK_a98b7274a3c24733615dd3dbaca" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6a1a82971ced4a662a15d448004" FOREIGN KEY ("refPromocodeId") REFERENCES "promocodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6a1a82971ced4a662a15d448004"`);
        await queryRunner.query(`ALTER TABLE "promocodes" DROP CONSTRAINT "FK_a98b7274a3c24733615dd3dbaca"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6a1a82971ced4a662a15d448004"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refPromocodeId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banned"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "ref_promocode" character varying`);
        await queryRunner.query(`DROP TABLE "promocodes"`);
    }

}
