import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // secret: configService.getJwtTokenSecret(),
      // signOptions: { expiresIn: configService.getJwtTokenDuration() }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
