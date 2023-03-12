import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "src/config/config.service";
import { User } from "src/user/entities/user.entity";
import { JwtPayload } from "src/auth/dto/jwt-payload.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserNotFoundException } from "src/exceptions/UserExceptions";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token"
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    super({
      secretOrKey: configService.getJwtRefreshTokenSecret(),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromBodyField("refresh_token")
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
