import { Module } from "@nestjs/common";
import { AppService } from "src/app.service";
import { AppController } from "src/app.controller";
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
