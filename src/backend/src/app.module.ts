import { Module } from "@nestjs/common";
import { configService } from "src/config/config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UrlModule } from "./url/url.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UrlModule
  ]
})
export class AppModule {}
