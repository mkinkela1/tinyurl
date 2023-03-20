import {
  HttpStatus,
  NotFoundException,
  PreconditionFailedException
} from "@nestjs/common";
import { InvalidEmailVerificationToken, UserNotFound } from "src/messages";

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: UserNotFound,
      statusCode: HttpStatus.NOT_FOUND
    });
  }
}

export class InvalidEmailVerificationTokenException extends PreconditionFailedException {
  constructor() {
    super({
      message: InvalidEmailVerificationToken,
      statusCode: HttpStatus.PRECONDITION_FAILED
    });
  }
}
