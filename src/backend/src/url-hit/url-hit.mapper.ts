import { UrlHit } from "src/url-hit/entities/url-hit.entity";
import { CreateUrlHitDtoResponse } from "src/url-hit/dto/response/create-url-hit.dto-response";

export class UrlHitMapper {
  maoToCreateUrlHitDtoResponse(urlHit: UrlHit): CreateUrlHitDtoResponse {
    return new CreateUrlHitDtoResponse(urlHit);
  }
}
