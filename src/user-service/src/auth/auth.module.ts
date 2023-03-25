import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { configService } from "src/config/config.service";
import { JwtTokenStrategy } from "src/auth/jwt-token.strategy";
import { JwtRefreshTokenStrategy } from "src/auth/jwt-refresh-token.strategy";
import { UserRepository } from "src/user/user.repository";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: configService.getJwtTokenSecret(),
      signOptions: { expiresIn: configService.getJwtTokenDuration() }
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "notification_queue",
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenStrategy,
    JwtRefreshTokenStrategy,
    UserRepository
  ],
  exports: [
    JwtTokenStrategy,
    JwtRefreshTokenStrategy,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})
  ]
})
export class AuthModule {}
