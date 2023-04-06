require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "dev";
  }

  public getSmtpHost() {
    return this.getValue("SMTP_HOST", true);
  }

  public getSmtpUsername() {
    return this.getValue("SMTP_USERNAME", true);
  }

  public getSmtpPassword() {
    return this.getValue("SMTP_PASSWORD", true);
  }

  public getDefaultNoReplyEmail() {
    return this.getValue("DEFAULT_NOREPLY_EMAIL", true);
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
  "SMTP_HOST",
  "SMTP_USERNAME",
  "SMTP_PASSWORD",
  "DEFAULT_NOREPLY_EMAIL"
]);

export { configService };
