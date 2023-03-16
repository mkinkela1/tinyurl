import { ApiResponseProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDtoResponse {
  @IsString()
  @ApiResponseProperty()
  token: string;

  @IsString()
  @ApiResponseProperty()
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
