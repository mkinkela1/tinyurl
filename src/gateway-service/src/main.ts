import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { Logger } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { PathItemObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const URL_SERVICE_URL = "http://localhost:8080";
  const USERS_SERVICE_URL = "http://localhost:8081";

  app.use(
    ["/api/user", "/api/auth"],
    createProxyMiddleware({
      target: USERS_SERVICE_URL,
      changeOrigin: true
    })
  );
  app.use(
    ["/api/url", "/api/url-hit"],
    createProxyMiddleware({
      target: URL_SERVICE_URL,
      changeOrigin: true
    })
  );

  const paths = await Promise.all(
    [8080, 8081]
      .map((port: number) => `http://0.0.0.0:${port}/api-json`)
      .map((url: string) => fetch(url).then((res) => res.json()))
  ).then((data: OpenAPIObject[]) => {
    let paths: Record<string, PathItemObject> = {};
    data.map((item) => {
      paths = { ...paths, ...item.paths };
    });
    return paths;
  });

  const document: OpenAPIObject = {
    openapi: "3.0.0",
    info: {
      title: "API gateway",
      version: "1.0"
    },
    paths: { ...paths }
  };
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
