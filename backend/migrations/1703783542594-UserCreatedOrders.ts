import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreatedOrders1703783542594 implements MigrationInterface {
    name = 'UserCreatedOrders1703783542594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_39b1402eea81b07616277578fa5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "REL_39b1402eea81b07616277578fa"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_39b1402eea81b07616277578fa5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_39b1402eea81b07616277578fa5"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "REL_39b1402eea81b07616277578fa" UNIQUE ("createdById")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_39b1402eea81b07616277578fa5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
