import { Entity, ManyToOne } from "typeorm";
import { BaseGlobalEntity } from "src/base.global-entity";
import { Url } from "src/url/entities/url.entity";

@Entity({ name: "url_hit" })
export class UrlHit extends BaseGlobalEntity {
  @ManyToOne(() => Url, (url) => url.urlHits)
  url: Url;
}
