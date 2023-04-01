import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "src/config/config.service";
import { AuthModule } from "src/auth/auth.module";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    ClientsModule.register([
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://rabbitmq:5672"],
          queue: "notification_queue",
          queueOptions: {
            durable: true
          }
        }
      }
    ])
  ]
})
export class AppModule {}
