import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserIsActivated1679789515305 implements MigrationInterface {
  name = "addUserIsActivated1679789515305";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
        ADD "isActive" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
        DROP COLUMN "isActive"`);
  }
}
