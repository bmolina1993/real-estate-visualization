import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662983956021 implements MigrationInterface {
    name = 'init1662983956021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_depto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_depto" text`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_general"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_general" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_general"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_general" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_depto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_depto" character varying(255)`);
    }

}
