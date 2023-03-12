import {
  ConflictException,
  UnauthorizedException
} from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common";
import { EmailAlreadyExists, WrongEmailOrPassword } from "src/messages";

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      message: EmailAlreadyExists,
      statusCode: HttpStatus.CONFLICT
    });
  }
}

export class WrongEmailOrPasswordException extends UnauthorizedException {
  constructor() {
    super({
      message: WrongEmailOrPassword,
      statusCode: HttpStatus.UNAUTHORIZED
    });
  }
}
