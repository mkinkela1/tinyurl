import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";
import { GetUrlByShortUrlDtoResponse } from "src/url/dto/response/get-url-by-short-url.dto-response";

@ApiTags("URL")
@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiExtraModels(CreateUrlDtoResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CreateUrlDtoResponse)
    }
  })
  @ApiInternalServerErrorResponse()
  create(
    @Body() createUrlDto: CreatetUrlDtoRequest
  ): Promise<CreateUrlDtoResponse> {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(":shortUrl")
  @ApiExtraModels(GetUrlByShortUrlDtoResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(GetUrlByShortUrlDtoResponse)
    }
  })
  @ApiNotFoundResponse()
  getUrlByShortUrl(
    @Param("shortUrl") shortUrl: string
  ): Promise<GetUrlByShortUrlDtoResponse> {
    return this.urlService.findOne(shortUrl);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.urlService.remove(+id);
  }
}
