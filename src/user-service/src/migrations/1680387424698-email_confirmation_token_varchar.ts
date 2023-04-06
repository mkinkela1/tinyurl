import { MigrationInterface, QueryRunner } from "typeorm";

export class emailConfirmationTokenVarchar1680387424698
  implements MigrationInterface
{
  name = "emailConfirmationTokenVarchar1680387424698";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
        DROP COLUMN "emailConfirmationToken"`);
    await queryRunner.query(`ALTER TABLE "user"
        ADD "emailConfirmationToken" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user"
        DROP COLUMN "emailConfirmationToken"`);
    await queryRunner.query(`ALTER TABLE "user"
        ADD "emailConfirmationToken" uuid`);
  }
}
