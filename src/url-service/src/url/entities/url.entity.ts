import { Column, Entity, OneToMany } from "typeorm";
import { BaseGlobalEntity } from "src/base.global-entity";
import { UrlHit } from "src/url-hit/entities/url-hit.entity";

@Entity({ name: "url" })
export class Url extends BaseGlobalEntity {
  @Column({ type: "varchar", length: 300 })
  longUrl: string;

  @Column({ type: "varchar", length: 300, unique: true })
  shortUrl: string;

  @OneToMany(() => UrlHit, (urlHit) => urlHit.url)
  urlHits: UrlHit[];
}
