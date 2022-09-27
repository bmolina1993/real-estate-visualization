import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662949012749 implements MigrationInterface {
    name = 'init1662949012749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "expense" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "published" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "views" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureDept" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureGral" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkMap" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkDepto" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkBase" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkBase" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkDepto" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "linkMap" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureGral" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureDept" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "views" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "published" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "expense" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "price" SET NOT NULL`);
    }

}
