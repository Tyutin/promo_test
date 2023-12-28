import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrder1703716559103 implements MigrationInterface {
    name = 'CreateOrder1703716559103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('processing', 'shipping', 'delivered', 'canceledByClient', 'canceledByService')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'processing', "deliveryAddress" character varying NOT NULL, "productPrice" integer NOT NULL, "shippingPrice" integer NOT NULL, "serviceCommission" integer NOT NULL, "clientNotes" character varying, "serviceNotes" character varying, "isPaidByClient" boolean NOT NULL DEFAULT false, "estimatedDeliveryTime" TIMESTAMP, "cancelReason" character varying, "currentLocation" character varying, "userId" uuid, "createdById" uuid, CONSTRAINT "REL_39b1402eea81b07616277578fa" UNIQUE ("createdById"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_39b1402eea81b07616277578fa5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_39b1402eea81b07616277578fa5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }

}
