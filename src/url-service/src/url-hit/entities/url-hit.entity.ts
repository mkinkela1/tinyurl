import { Column, Entity, ManyToOne } from "typeorm";
import { Url } from "src/url/entities/url.entity";
import { BaseGlobalEntity } from "src/shared/base.global-entity";

@Entity({ name: "url_hit" })
export class UrlHit extends BaseGlobalEntity {
  @ManyToOne(() => Url, (url) => url.urlHits)
  url: Url;

  @Column({ type: "varchar", length: 300 })
  country: string;
}
