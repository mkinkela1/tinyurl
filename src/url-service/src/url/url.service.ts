import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { customAlphabet } from "nanoid/async";
import {
  SHORT_URL_ALPHABET,
  SHORT_URL_LENGTH
} from "src/constants/ShortUrlConstants";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import { Url } from "src/url/entities/url.entity";
import { GetUrlByShortUrlDtoResponse } from "src/url/dto/response/get-url-by-short-url.dto-response";
import { DtoPaginationResult } from "src/shared/dto/response/DtoPaginationResponse";
import { GetAllUrlsPaginatedDtoRequest } from "src/url/dto/request/get-all-urls-paginated.dto-request";
import { GetAllUrlsPaginatedDtoResponse } from "src/url/dto/response/get-all-urls-paginated.dto-response";
import { CreateUrlDtoRequest } from "src/url/dto/request/create-url.dto-request";
import { UrlMapper } from "src/url/url.mapper";
import { UrlRepository } from "src/url/url.repository";
import { Connection } from "typeorm";

@Injectable()
export class UrlService {
  constructor(
    private mapper: UrlMapper,
    private urlRepository: UrlRepository,
    private readonly connection: Connection
  ) {
    this.urlRepository = this.connection.getCustomRepository(UrlRepository);
  }

  async create({
    longUrl
  }: CreateUrlDtoRequest): Promise<CreateUrlDtoResponse> {
    const nanoid = customAlphabet(SHORT_URL_ALPHABET, SHORT_URL_LENGTH);
    const shortUrl = await nanoid();

    const url = this.urlRepository.create({
      longUrl,
      shortUrl
    });

    try {
      await this.urlRepository.save(url);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return this.mapper.mapToCreateUrlDtoResponse(url);
  }

  async getAllUrlsPaginated(
    request: GetAllUrlsPaginatedDtoRequest
  ): Promise<DtoPaginationResult<GetAllUrlsPaginatedDtoResponse>> {
    const {
      data,
      cursor: { beforeCursor, afterCursor }
    } = await this.urlRepository.getAll(request);

    const totalCount = await this.urlRepository.countAll(request.search);

    return new DtoPaginationResult({
      beforeCursor,
      afterCursor,
      totalCount,
      pageSize: request.pageSize,
      data: data.map((url: Url) => new GetAllUrlsPaginatedDtoResponse(url))
    });
  }

  async findOne(shortUrl: string): Promise<GetUrlByShortUrlDtoResponse> {
    const url = await this.urlRepository.findOne({ where: { shortUrl } });

    if (!url) throw new NotFoundException();

    return this.mapper.mapToGetUrlByShortUrl(url);
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
