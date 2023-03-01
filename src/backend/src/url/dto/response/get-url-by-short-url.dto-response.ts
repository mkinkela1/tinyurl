import { IsDate, IsString, IsUrl, IsUUID } from "class-validator";
import { ApiResponseProperty } from "@nestjs/swagger";

export class GetUrlByShortUrlDtoResponse {
  @IsUUID()
  @ApiResponseProperty()
  id: string;

  @IsUrl()
  @ApiResponseProperty()
  longUrl: string;

  @IsString()
  @ApiResponseProperty()
  shortUrl: string;

  @IsDate()
  @ApiResponseProperty()
  createDateTime: Date;

  constructor(obj: Partial<GetUrlByShortUrlDtoResponse>) {
    Object.assign(this, obj);
  }
}
