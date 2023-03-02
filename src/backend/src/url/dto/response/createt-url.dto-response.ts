import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatetUrlDtoRequest {
  @ApiProperty()
  @IsUrl()
  longUrl: string;
}
