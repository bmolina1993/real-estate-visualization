import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1662948901920 implements MigrationInterface {
  name = 'init1662948901920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "data_estate" ("create_dttm" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "update_dttm" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "price" character varying(255) NOT NULL, "expense" character varying(255) NOT NULL, "published" character varying(255) NOT NULL, "views" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "featureDept" character varying(255) NOT NULL, "featureGral" character varying(255) NOT NULL, "linkMap" character varying(255) NOT NULL, "linkDepto" character varying(255) NOT NULL, "linkBase" character varying(255) NOT NULL, CONSTRAINT "PK_ae7e5532f8406258419ed617b44" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "data_estate"`);
  }
}
