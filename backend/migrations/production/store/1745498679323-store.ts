import { MigrationInterface, QueryRunner } from "typeorm";

export class Store1745498679323 implements MigrationInterface {
    name = 'Store1745498679323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "bonus_data"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user_profit_discount_percentage"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "user_profit_discount_amount"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "available_quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "setting" ADD "product_code_prefix" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."payment_payment_type_enum" RENAME TO "payment_payment_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_payment_type_enum" AS ENUM('receipt', 'online')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" TYPE "public"."payment_payment_type_enum" USING "payment_type"::"text"::"public"."payment_payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" SET DEFAULT 'receipt'`);
        await queryRunner.query(`DROP TYPE "public"."payment_payment_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_payment_type_enum_old" AS ENUM('receipt', 'debit', 'online')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" TYPE "public"."payment_payment_type_enum_old" USING "payment_type"::"text"::"public"."payment_payment_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "payment_type" SET DEFAULT 'receipt'`);
        await queryRunner.query(`DROP TYPE "public"."payment_payment_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_payment_type_enum_old" RENAME TO "payment_payment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "setting" DROP COLUMN "product_code_prefix"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "available_quantity"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user_profit_discount_amount" numeric(15,0) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ADD "user_profit_discount_percentage" numeric(5,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "bonus_data" jsonb`);
    }

}
