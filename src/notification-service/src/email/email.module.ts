import { Module } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { EmailController } from "src/email/email.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { configService } from "src/config/config.service";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { RMQModule } from "nestjs-rmq";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.getSmtpHost(),
        port: 1025,
        secure: false,
        auth: {
          user: configService.getSmtpUsername(),
          pass: configService.getSmtpPassword()
        }
      },
      defaults: {
        from: `"No reply", ${configService.getDefaultNoReplyEmail()}`
      },
      template: {
        dir: process.cwd() + "/dist/email/",
        adapter: new HandlebarsAdapter(),
        options: { strict: false }
      }
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: "NOTIFICATION_SERVICE",
    //     // imports: [ConfigModule],
    //     useFactory: () => ({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: ["amqp://rabbitmq:5672"],
    //         queue: "notification_queue",
    //         queueOptions: {
    //           durable: false
    //         }
    //       }
    //     })
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
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
