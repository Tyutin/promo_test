import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderName1703796333068 implements MigrationInterface {
    name = 'OrderName1703796333068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
    }

}
