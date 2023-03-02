import { MigrationInterface, QueryRunner } from "typeorm";

export class url1670188484772 implements MigrationInterface {
  name = "url1670188484772";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "url"
                             (
                                 "id"             uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "longUrl"        character varying(300)   NOT NULL,
                                 "shortUrl"       character varying(300)   NOT NULL,
                                 CONSTRAINT "UQ_5f81972de6fed8a2e99a818a8b6" UNIQUE ("shortUrl"),
                                 CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "url"`);
  }
}
