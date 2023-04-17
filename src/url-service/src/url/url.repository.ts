import { getConnection, Repository } from "typeorm";
import { Url } from "src/url/entities/url.entity";
import { buildPaginator, PagingResult } from "typeorm-cursor-pagination";
import { GetAllUrlsPaginatedDtoRequest } from "src/url/dto/request/get-all-urls-paginated.dto-request";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UrlRepository extends Repository<Url> {
  public async getAll(
    meta: GetAllUrlsPaginatedDtoRequest
  ): Promise<PagingResult<Url>> {
    const queryBuilder = getConnection()
      .getRepository(Url)
      .createQueryBuilder("url");

    const paginator = buildPaginator({
      entity: Url,
      paginationKeys: [meta.sortBy ?? "createDateTime"],
      query: {
        limit: +meta.pageSize,
        order: meta.orderBy,
        afterCursor: meta.afterCursor ?? null,
        beforeCursor: meta.beforeCursor ?? null
      }
    });

    const { data, cursor } = await paginator.paginate(queryBuilder);

    console.log(data);

    return { data, cursor };
  }
}
