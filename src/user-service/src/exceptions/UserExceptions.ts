import { HttpStatus, NotFoundException } from "@nestjs/common";
import { UserNotFound } from "src/messages";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: UserNotFound,
      statusCode: HttpStatus.NOT_FOUND
    });
  }
}
