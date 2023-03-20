import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class ResendVerificationEmailDtoRequest {
  @ApiProperty()
  @IsJWT()
  email: string;
}
