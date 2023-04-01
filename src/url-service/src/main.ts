import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { configService } from "src/config/config.service";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders:
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Encoding"
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("URL service backend")
    .setDescription("URL service API examples")
    .setVersion("1.0")
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header"
      },
      "JWT"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(configService.getPort(), "0.0.0.0");
}

bootstrap();
