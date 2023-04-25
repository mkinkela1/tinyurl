import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateUrlHitDtoRequest {
  @ApiProperty()
  @IsUUID()
  urlId: string;

  @ApiProperty()
  @IsString()
  country: string;
}
