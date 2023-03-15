import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { Logger } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

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
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
