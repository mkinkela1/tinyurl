import { ApiResponseProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenDtoResponse {
  @ApiResponseProperty()
  @IsJWT()
  token: string;

  @ApiResponseProperty()
  @IsJWT()
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
