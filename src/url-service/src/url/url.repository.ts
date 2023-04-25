import { EntityRepository, getConnection, Repository } from "typeorm";
import { Url } from "src/url/entities/url.entity";
import { buildPaginator, PagingResult } from "typeorm-cursor-pagination";
import { GetAllUrlsPaginatedDtoRequest } from "src/url/dto/request/get-all-urls-paginated.dto-request";

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
  constructor() {
    super();
  }

  public async countAll(search: string = null): Promise<number> {
    const queryBuilder = getConnection()
      .getRepository(Url)
      .createQueryBuilder("url");

    if (search)
      queryBuilder.orWhere("url.longUrl LIKE :search", {
        search: `%${search}%`
      });
    if (search)
      queryBuilder.orWhere("url.shortUrl LIKE :search", {
        search: `%${search}%`
      });

    return await queryBuilder.getCount();
  }

  public async getAll(
    request: GetAllUrlsPaginatedDtoRequest
  ): Promise<PagingResult<Url>> {
    const { sortBy, pageSize, orderBy, afterCursor, beforeCursor, search } =
      request;
    const queryBuilder = getConnection()
      .getRepository(Url)
      .createQueryBuilder("url");

    if (search)
      queryBuilder.orWhere("url.longUrl LIKE :search", {
        search: `%${search}%`
      });
    if (search)
      queryBuilder.orWhere("url.shortUrl LIKE :search", {
        search: `%${search}%`
      });

    const paginator = buildPaginator({
      entity: Url,
      paginationKeys: [request.sortBy ?? "createDateTime"],
      query: {
        limit: +pageSize,
        order: orderBy,
        afterCursor: afterCursor ?? null,
        beforeCursor: beforeCursor ?? null
      }
    });

    const { data, cursor } = await paginator.paginate(queryBuilder);

    return { data, cursor };
  }
}
