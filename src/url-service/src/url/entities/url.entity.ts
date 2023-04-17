import { Column, Entity, OneToMany } from "typeorm";
import { UrlHit } from "src/url-hit/entities/url-hit.entity";
import { BaseGlobalEntity } from "src/shared/base.global-entity";

@Entity({ name: "url" })
export class Url extends BaseGlobalEntity {
  @Column({ type: "varchar", length: 300 })
  longUrl: string;

  @Column({ type: "varchar", length: 300, unique: true })
  shortUrl: string;

  @OneToMany(() => UrlHit, (urlHit) => urlHit.url)
  urlHits: UrlHit[];
}
