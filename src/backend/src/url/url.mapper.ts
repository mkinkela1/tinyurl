import { Url } from "src/url/entities/url.entity";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import { GetUrlByShortUrlDtoResponse } from "src/url/dto/response/get-url-by-short-url.dto-response";

export class UrlMapper {
  mapToCreateUrlDtoResponse(url: Url): CreateUrlDtoResponse {
    return new CreateUrlDtoResponse(url);
  }

  mapToGetUrlByShortUrl(url: Url): GetUrlByShortUrlDtoResponse {
    return new GetUrlByShortUrlDtoResponse(url);
  }
}
