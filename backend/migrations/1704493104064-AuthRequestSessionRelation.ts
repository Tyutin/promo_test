import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthRequestSessionRelation1704493104064 implements MigrationInterface {
    name = 'AuthRequestSessionRelation1704493104064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_e083ee6e42193f8cfe8a88461a0"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "REL_e083ee6e42193f8cfe8a88461a"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "authRequestId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "authRequestId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "authRequestId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "authRequestId" uuid`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "REL_e083ee6e42193f8cfe8a88461a" UNIQUE ("authRequestId")`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_e083ee6e42193f8cfe8a88461a0" FOREIGN KEY ("authRequestId") REFERENCES "authRequests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
