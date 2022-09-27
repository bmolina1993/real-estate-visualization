import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1663294680028 implements MigrationInterface {
  name = 'init1663294680028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "link_map"`);
    await queryRunner.query(
      `ALTER TABLE "data_estate" ADD "link_map" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "data_estate" DROP COLUMN "link_map"`);
    await queryRunner.query(
      `ALTER TABLE "data_estate" ADD "link_map" character varying(255)`,
    );
  }
}
