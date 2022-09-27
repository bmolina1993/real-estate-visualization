import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662949324178 implements MigrationInterface {
    name = 'init1662949324178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "featureDept"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "featureGral"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "linkMap"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "linkDepto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "linkBase"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_depto" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_general" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "link_map" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "link_depto" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "link_base" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "link_base"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "link_depto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "link_map"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_general"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_depto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "linkBase" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "linkDepto" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "linkMap" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "featureGral" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "featureDept" character varying(255)`);
    }

}
