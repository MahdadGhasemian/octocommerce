import { MigrationInterface, QueryRunner } from "typeorm";

export class Store1745662904973 implements MigrationInterface {
    name = 'Store1745662904973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9c579c17491158a75f1a9fbdc05"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_04ec30f762773255afc023e6524"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04ec30f762773255afc023e652"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c579c17491158a75f1a9fbdc0"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying, "phone" character varying, "mobile_phone" character varying, "address" character varying, "city" character varying, "postal_code" character varying, "national_code" character varying, "economic_code" character varying, "latitude" double precision, "longitude" double precision, "user_id" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35cd6c3fafec0bb5d072e24ea2" ON "address" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "contact_id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "contact_snapshot"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "billing_contact_id"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "billing_contact_snapshot"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "delivery_address" jsonb`);
        await queryRunner.query(`ALTER TABLE "order" ADD "billing_address" jsonb`);
        await queryRunner.query(`CREATE TYPE "public"."user_user_type_enum" AS ENUM('individual', 'enterprise')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_type" "public"."user_user_type_enum" NOT NULL DEFAULT 'individual'`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type"`);
        await queryRunner.query(`DROP TYPE "public"."user_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "billing_address"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "delivery_address"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "billing_contact_snapshot" jsonb`);
        await queryRunner.query(`ALTER TABLE "order" ADD "billing_contact_id" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD "contact_snapshot" jsonb`);
        await queryRunner.query(`ALTER TABLE "order" ADD "contact_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35cd6c3fafec0bb5d072e24ea2"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`CREATE INDEX "IDX_9c579c17491158a75f1a9fbdc0" ON "order" ("billing_contact_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_04ec30f762773255afc023e652" ON "order" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_04ec30f762773255afc023e6524" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9c579c17491158a75f1a9fbdc05" FOREIGN KEY ("billing_contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
