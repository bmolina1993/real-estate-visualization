import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662984599505 implements MigrationInterface {
    name = 'init1662984599505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "featureDept"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "featureDept" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "featureDept"`);
        await queryRunner.query(`ALTER TABLE "data_estate" ADD "featureDept" text NOT NULL`);
    }

}
