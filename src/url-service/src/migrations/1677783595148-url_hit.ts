import { MigrationInterface, QueryRunner } from "typeorm";

export class urlHit1677783595148 implements MigrationInterface {
  name = "urlHit1677783595148";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "url_hit"
                             (
                                 "id"             uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "urlId"          uuid,
                                 CONSTRAINT "PK_82dce7a477a5d033d196a222c46" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "url_hit"
        ADD CONSTRAINT "FK_167288742032bf3fcc93e8be8ff" FOREIGN KEY ("urlId") REFERENCES "url" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "url_hit"
        DROP CONSTRAINT "FK_167288742032bf3fcc93e8be8ff"`);
    await queryRunner.query(`DROP TABLE "url_hit"`);
  }
}
