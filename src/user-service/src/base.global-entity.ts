import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { v4 } from "uuid";

export abstract class BaseGlobalEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createDateTime: Date;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
