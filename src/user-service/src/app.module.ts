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
    // ClientsModule.register([
    //   {
    //     name: "NOTIFICATION_SERVICE",
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ["amqp://rabbitmq:5672"],
    //       queue: "notification_queue",
    //       queueOptions: {
    //         durable: true
    //       }
    //     }
    //   }
    // ])
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
