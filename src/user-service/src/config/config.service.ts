import { TypeOrmModuleOptions } from "@nestjs/typeorm";

require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "dev";
  }

  public getEmailConfirmationTokenSecret() {
    return this.getValue("JWT_EMAIL_CONFIRMATION_TOKEN_SECRET", true);
  }

  public getEmailConfirmationTokenDuration() {
    return this.getValue("JWT_EMAIL_CONFIRMATION_TOKEN_DURATION", true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DB"),

      migrationsTableName: "migrations",

      migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
      entities: [__dirname + "/../**/*{.ts,.js}"],

      cli: {
        migrationsDir: "src/migrations"
      },

      keepConnectionAlive: true,

      ssl: this.isProduction(),
      logging: !this.isProduction()
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB"
]);

export { configService };
