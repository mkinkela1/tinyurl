import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDtoRequest } from "src/auth/dto/request/sign-up.dto-request";
import * as bcrypt from "bcrypt";
import { configService } from "src/config/config.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/dto/jwt-payload.interface";
import {
  EmailAlreadyExistsException,
  WrongEmailOrPasswordException
} from "src/exceptions/AuthExceptions";
import { SignInDtoRequest } from "src/auth/dto/request/sign-in.dto-request";
import { SignInDtoResponse } from "src/auth/dto/response/sign-in.dto-response";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async signUp(dto: SignUpDtoRequest): Promise<void> {
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

  async signIn(dto: SignInDtoRequest): Promise<SignInDtoResponse> {
    const { email, password } = dto;
    const user: User = await this.usersRepository.findOne({ email });
    if (!user) throw new WrongEmailOrPasswordException();

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new WrongEmailOrPasswordException();

    const payload: JwtPayload = { email };
    const token: string = this.getAccessToken(payload);
    const refreshToken: string = this.getRefreshToken(payload);

    return new SignInDtoResponse(token, refreshToken);
  }

  private getAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getJwtTokenSecret(),
      expiresIn: configService.getJwtTokenDuration()
    });
  }

  private getRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getJwtRefreshTokenSecret(),
      expiresIn: configService.getJwtRefreshTokenDuration()
    });
  }

  private getEmailConfirmationToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getEmailConfirmationTokenSecret(),
      expiresIn: configService.getEmailConfirmationTokenDuration()
    });
  }
}
