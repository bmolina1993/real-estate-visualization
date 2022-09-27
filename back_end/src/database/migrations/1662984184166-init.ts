import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662984184166 implements MigrationInterface {
    name = 'init1662984184166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "feature_depto" TO "featureDept"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureDept" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "featureDept" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "featureDept" TO "feature_depto"`);
    }

}
