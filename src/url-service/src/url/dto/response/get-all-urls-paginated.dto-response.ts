import { ApiResponseProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsUUID } from "class-validator";
import { Url } from "src/url/entities/url.entity";

export class GetAllUrlsPaginatedDtoResponse {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiResponseProperty()
  @IsString()
  longUrl: string;

  @ApiResponseProperty()
  @IsString()
  shortUrl: string;

  @ApiResponseProperty()
  @IsDate()
  createdAt: Date;

  constructor(url: Url) {
    this.id = url.id;
    this.longUrl = url.longUrl;
    this.shortUrl = url.shortUrl;
    this.createdAt = url.createDateTime;
  }
}
