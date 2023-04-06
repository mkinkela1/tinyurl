import { Controller, Logger } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { MailerService } from "@nestjs-modules/mailer";
import { RMQRoute } from "nestjs-rmq";

@Controller("email")
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly mailerService: MailerService
  ) {}

  @RMQRoute("email.sign_up")
  async handleEmailSignUp(data: any): Promise<boolean> {
    Logger.log(data);

    try {
      await this.mailerService.sendMail({
        to: "test@test.com",
        subject: "Confirmation",
        template: "./templates/email_confirmation",
        context: {
          confirmationToken: "bla"
        }
      });
    } catch (e) {
      Logger.error(e);
    }

    return true;
  }
}
