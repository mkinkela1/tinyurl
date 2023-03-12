import { MigrationInterface, QueryRunner } from "typeorm";

export class user1678573399418 implements MigrationInterface {
  name = "user1678573399418";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user"
                             (
                                 "id"                     uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "createDateTime"         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "email"                  character varying(300)   NOT NULL,
                                 "password"               character varying(300)   NOT NULL,
                                 "firstName"              character varying(300)   NOT NULL,
                                 "lastName"               character varying(300)   NOT NULL,
                                 "emailConfirmationToken" uuid,
                                 "passwordResetToken"     character varying,
                                 CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                                 CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
