import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UrlMapper } from "src/url/url.mapper";
import { Url } from "src/url/entities/url.entity";
import { UrlRepository } from "src/url/url.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlController],
  providers: [UrlService, UrlMapper, UrlRepository],
  exports: [TypeOrmModule.forFeature([Url])]
})
export class UrlModule {}
