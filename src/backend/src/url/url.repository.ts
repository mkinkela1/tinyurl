import { EntityRepository, Repository } from "typeorm";
import { Url } from "src/url/entities/url.entity";

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {}
