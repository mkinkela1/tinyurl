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
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import { UrlMapper } from "src/url/url.mapper";
import { Repository } from "typeorm";
import { Url } from "src/url/entities/url.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetUrlByShortUrlDtoResponse } from "src/url/dto/response/get-url-by-short-url.dto-response";

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private mapper: UrlMapper
  ) {}

  async create({
    longUrl
  }: CreatetUrlDtoRequest): Promise<CreateUrlDtoResponse> {
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

  findAll() {
    return this.urlRepository.findAndCount();
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
