import { Column, Entity } from "typeorm";
import { BaseGlobalEntity } from "src/base.global-entity";

@Entity({ name: "url" })
export class Url extends BaseGlobalEntity {
  @Column({ type: "varchar", length: 300 })
  longUrl: string;

  @Column({ type: "varchar", length: 300, unique: true })
  shortUrl: string;
}
