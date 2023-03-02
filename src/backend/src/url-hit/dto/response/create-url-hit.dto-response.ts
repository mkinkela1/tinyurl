import { ApiResponseProperty } from "@nestjs/swagger";
import { IsDate, IsUUID } from "class-validator";

export class CreateUrlHitDtoResponse {
  @IsUUID()
  @ApiResponseProperty()
  id: string;

  @IsUUID()
  @ApiResponseProperty()
  urlId: string;

  @IsDate()
  @ApiResponseProperty()
  createDateTime: Date;

  constructor(obj: Partial<CreateUrlHitDtoResponse>) {
    Object.assign(this, obj);
  }
}
