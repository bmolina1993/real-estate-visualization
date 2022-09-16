import { MigrationInterface, QueryRunner } from "typeorm";

export class init1663330500841 implements MigrationInterface {
    name = 'init1663330500841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_estate" ("create_dttm" TIMESTAMP NOT NULL DEFAULT now(), "update_dttm" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "price" character varying(255), "expense" character varying(255), "published" character varying(255), "view" character varying(255), "address" character varying(255), "feature_depto" text array, "feature_general" text array, "link_map" character varying, "link_depto" character varying(255), "link_base" character varying(255), CONSTRAINT "PK_ae7e5532f8406258419ed617b44" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data_estate"`);
    }

}
