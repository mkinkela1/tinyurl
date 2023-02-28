import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";
import { CreateUrlDtoResponse } from "src/url/dto/response/create-url.dto-response";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiExtraModels(CreateUrlDtoResponse) // for CatDto to be found by getSchemaPath()
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CreateUrlDtoResponse)
    }
  })
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
  findOne(@Param("shortUrl") shortUrl: string) {
    return this.urlService.findOne(shortUrl);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.urlService.remove(+id);
  }
}
