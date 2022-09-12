import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662985161779 implements MigrationInterface {
    name = 'init1662985161779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "views" TO "view"`);
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_general"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_general" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "feature_general"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "feature_general" text`);
        await queryRunner.query(`ALTER TABLE "data_estate" RENAME COLUMN "view" TO "views"`);
    }

}
