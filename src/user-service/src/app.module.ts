import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "src/config/config.service";
import { AuthModule } from "src/auth/auth.module";
import { RMQModule } from "nestjs-rmq";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    RMQModule.forRoot({
      exchangeName: "NOTIFICATION_SERVICE",
      connections: [
        {
          login: "guest",
          password: "guest",
          host: "rabbitmq:5672"
        }
      ],
      queueOptions: { durable: false },
      queueName: "notification_queue"
    })
  ]
})
export class AppModule {}
