import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
    // new FastifyAdapter({ logger: true })
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://rabbitmq:5672"],
      queue: "notification_queue",
      queueOptions: {
        durable: true
      }
    }
  });

  console.log("started");

  await app.startAllMicroservices();
}

bootstrap();
