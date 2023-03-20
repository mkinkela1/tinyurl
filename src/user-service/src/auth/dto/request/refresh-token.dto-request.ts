import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenDtoRequest {
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
