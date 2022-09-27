import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662985041661 implements MigrationInterface {
    name = 'init1662985041661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "featureDept" TO "feature_depto"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "feature_depto" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" ALTER COLUMN "feature_depto" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "feature_depto" TO "featureDept"`);
    }

}
