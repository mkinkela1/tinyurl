import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UrlService } from "./url.service";
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";

@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreatetUrlDtoRequest) {
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
