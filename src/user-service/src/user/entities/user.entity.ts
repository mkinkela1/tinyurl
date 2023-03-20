import { BaseGlobalEntity } from "src/base.global-entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseGlobalEntity {
  @Column({ type: "varchar", length: 300, unique: true })
  email: string;

  @Column({ type: "varchar", length: 300 })
  password: string;

  @Column({ type: "varchar", length: 300 })
  firstName: string;

  @Column({ type: "varchar", length: 300 })
  lastName: string;

  @Column({ type: "uuid", nullable: true })
  emailConfirmationToken: string;

  @Column({ type: "varchar", nullable: true })
  passwordResetToken: string;

  @Column({ type: "boolean", default: false, nullable: false })
  isActive: boolean;
}
