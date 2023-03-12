import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DtoSignUpRequest } from "src/auth/dto/request/DtoSignUpRequest";
import * as bcrypt from "bcrypt";
import { configService } from "src/config/config.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/dto/jwt-payload.interface";
import { EmailAlreadyExistsException } from "src/exceptions/AuthExceptions";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async signUp(dto: DtoSignUpRequest): Promise<void> {
    const { email, password, firstName, lastName } = dto;

    const salt = await bcrypt.genSalt();
    const emailConfirmationToken: string = this.getEmailConfirmationToken({
      email
    });
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedEmailConfirmationToken: string = bcrypt.hash(
      emailConfirmationToken,
      salt
    );

    const user = this.usersRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailConfirmationToken: hashedEmailConfirmationToken
    });

    try {
      await this.usersRepository.save(user);
      // TODO: send email confirmation
    } catch (e) {
      if (e.code === "23505") throw new EmailAlreadyExistsException();
      else new InternalServerErrorException(e);
    }
  }

  private getEmailConfirmationToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getEmailConfirmationTokenSecret(),
      expiresIn: configService.getEmailConfirmationTokenDuration()
    });
  }
}
