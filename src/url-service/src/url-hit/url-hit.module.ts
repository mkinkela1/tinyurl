import { Module } from "@nestjs/common";
import { UrlHitService } from "./url-hit.service";
import { UrlHitController } from "./url-hit.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UrlHit } from "src/url-hit/entities/url-hit.entity";
import { UrlHitMapper } from "src/url-hit/url-hit.mapper";
import { Url } from "src/url/entities/url.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UrlHit, Url])],
  controllers: [UrlHitController],
  providers: [UrlHitService, UrlHitMapper]
})
export class UrlHitModule {}
