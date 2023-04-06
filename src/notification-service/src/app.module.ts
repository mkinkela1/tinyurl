import { Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { EmailModule } from "src/email/email.module";
import { RMQModule } from "nestjs-rmq";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    EmailModule,
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
