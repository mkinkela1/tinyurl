import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "src/url/entities/url.entity";
import { UrlMapper } from "src/url/url.mapper";
import { UrlRepository } from "src/url/url.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Url, UrlRepository])],
  controllers: [UrlController],
  providers: [UrlService, UrlMapper]
})
export class UrlModule {}
