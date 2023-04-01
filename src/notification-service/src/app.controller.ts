import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "src/app.service";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern("email_notification")
  handleEmailNotification(@Payload() data: any): void {
    Logger.log(data);
  }
}
