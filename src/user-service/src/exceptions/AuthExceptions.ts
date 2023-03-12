import { ConflictException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common";
import { EmailAlreadyExists } from "src/messages";

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      message: EmailAlreadyExists,
      statusCode: HttpStatus.CONFLICT
    });
  }
}
