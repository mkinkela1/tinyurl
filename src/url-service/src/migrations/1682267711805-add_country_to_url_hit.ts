import { MigrationInterface, QueryRunner } from "typeorm";

export class addCountryToUrlHit1682267711805 implements MigrationInterface {
  name = "addCountryToUrlHit1682267711805";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "url_hit"
        ADD "country" character varying(300) NOT NULL default 'Unknown'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "url_hit"
        DROP COLUMN "country"`);
  }
}
