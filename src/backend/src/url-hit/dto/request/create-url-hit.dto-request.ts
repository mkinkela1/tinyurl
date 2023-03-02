import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateUrlHitDtoRequest {
  @ApiProperty()
  @IsUUID()
  urlId: string;
}
