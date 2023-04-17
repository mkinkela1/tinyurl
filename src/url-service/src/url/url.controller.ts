import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query
} from "@nestjs/common";
import { UrlService } from "./url.service";
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
import { CreateUrlDtoRequest } from "src/url/dto/request/create-url.dto-request";
import { GetAllUrlsPaginatedDtoRequest } from "src/url/dto/request/get-all-urls-paginated.dto-request";
import { GetAllUrlsPaginatedDtoResponse } from "src/url/dto/response/get-all-urls-paginated.dto-response";
import { DtoPaginationResult } from "src/shared/dto/response/DtoPaginationResponse";

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
    @Body() createUrlDto: CreateUrlDtoRequest
  ): Promise<CreateUrlDtoResponse> {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  @ApiExtraModels(DtoPaginationResult, GetAllUrlsPaginatedDtoResponse)
  @ApiResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(DtoPaginationResult) },
        {
          properties: {
            data: {
              type: "array",
              items: { $ref: getSchemaPath(GetAllUrlsPaginatedDtoResponse) }
            }
          }
        }
      ]
    }
  })
  getAllUrlsPaginated(
    @Query() request: GetAllUrlsPaginatedDtoRequest
  ): Promise<DtoPaginationResult<GetAllUrlsPaginatedDtoResponse>> {
    return this.urlService.getAllUrlsPaginated(request);
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
