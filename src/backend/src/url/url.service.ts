import { Injectable } from "@nestjs/common";
import { UrlRepository } from "src/url/url.repository";
import { customAlphabet } from "nanoid/async";
import {
  SHORT_URL_ALPHABET,
  SHORT_URL_LENGTH
} from "src/constants/ShortUrlConstants";
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import { UrlMapper } from "src/url/url.mapper";

@Injectable()
export class UrlService {
  constructor(
    private urlRepository: UrlRepository,
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

    return this.mapper.mapToCreateUrlDtoResponse(url);
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
