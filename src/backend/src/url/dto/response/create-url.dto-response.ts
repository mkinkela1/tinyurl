import { IsDate, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateUrlDtoResponse {
  @IsUUID()
  id: string;

  @IsUrl()
  longUrl: string;

  @IsString()
  shortUrl: string;

  @IsDate()
  createDateTime: Date;

  constructor(obj: Partial<CreateUrlDtoResponse>) {
    Object.assign(this, obj);
  }
}
