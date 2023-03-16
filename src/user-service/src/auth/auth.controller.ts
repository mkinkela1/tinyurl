import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { SignUpDtoRequest } from "src/auth/dto/request/sign-up.dto-request";
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";
import { SignInDtoRequest } from "src/auth/dto/request/sign-in.dto-request";
import { SignInDtoResponse } from "src/auth/dto/response/sign-in.dto-response";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() dto: SignUpDtoRequest): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post("/signin")
  @ApiExtraModels(SignInDtoResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(SignInDtoResponse)
    }
  })
  signIn(@Body() dto: SignInDtoRequest): Promise<SignInDtoResponse> {
    return this.authService.signIn(dto);
  }
}
