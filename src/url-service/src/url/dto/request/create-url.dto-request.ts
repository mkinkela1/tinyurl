import { IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUrlDtoRequest {
  @ApiProperty()
  @IsUrl()
  longUrl: string;
}
