import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
    // new FastifyAdapter({ logger: true })
  );

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ["amqp://rabbitmq:5672"],
  //     queue: "notification_queue",
  //     queueOptions: {
  //       durable: false
  //     }
  //   }
  // });
  //
  // console.log("started");
  //
  // await app.startAllMicroservices();
  await app.listen(8020, "0.0.0.0");
}

bootstrap();
