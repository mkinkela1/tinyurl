import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class VerifyEmailDtoRequest {
  @ApiProperty()
  @IsJWT()
  emailConfirmationToken: string;
}
