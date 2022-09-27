import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1664131595843 implements MigrationInterface {
  name = 'init1664131595843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "feature_depto" ("create_dttm" TIMESTAMP NOT NULL DEFAULT now(), "update_dttm" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "id_data_estate" integer NOT NULL, "m2_total" integer, "m2_cubierta" integer, "ambiente" integer, "banio" integer, "dormitorio" integer, "antiguedad" integer, "disposicion" character varying(255), "orientacion" character varying(255), "cochera" integer, CONSTRAINT "PK_2169d6d18ed07e1c47238ec8238" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "geolocation" ("create_dttm" TIMESTAMP NOT NULL DEFAULT now(), "update_dttm" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "id_data_estate" integer NOT NULL, "latitude" character varying(255), "longitude" character varying(255), CONSTRAINT "PK_36aa5f8d0de597a21a725ee1cc2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "geolocation"`);
    await queryRunner.query(`DROP TABLE "feature_depto"`);
  }
}
