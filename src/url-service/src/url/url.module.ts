import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "src/url/entities/url.entity";
import { UrlMapper } from "src/url/url.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlController],
  providers: [UrlService, UrlMapper]
})
export class UrlModule {}
