import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { DtoSignUpRequest } from "src/auth/dto/request/DtoSignUpRequest";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() dto: DtoSignUpRequest): Promise<void> {
    return this.authService.signUp(dto);
  }

  // @Post("/signin")
  // signIn(@Body() dto: DtoSignInRequest): Promise<DtoSignInResponse> {
  //   return this.authService.signIn(dto);
  // }
}
