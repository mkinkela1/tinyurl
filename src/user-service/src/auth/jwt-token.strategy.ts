import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "src/config/config.service";
import { JwtPayload } from "src/auth/dto/jwt-payload.interface";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserNotFoundException } from "src/exceptions/UserExceptions";

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    super({
      secretOrKey: configService.getJwtTokenSecret(),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
