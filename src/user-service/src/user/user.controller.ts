import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/get-user.decorator";
import CurrentUserDtoResponse from "src/user/dto/response/current-user.dto-response";

@ApiTags("USER")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth("JWT")
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getCurrentUser(@CurrentUser() user: User): Promise<CurrentUserDtoResponse> {
    return this.userService.getCurrentUser(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
