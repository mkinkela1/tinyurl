import {
  Inject,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
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
import {
  InvalidEmailVerificationTokenException,
  UserNotFoundException
} from "src/exceptions/UserExceptions";
import { RefreshTokenDtoRequest } from "src/auth/dto/request/refresh-token.dto-request";
import { RefreshTokenDtoResponse } from "src/auth/dto/response/refresh-token.dto-response";
import jwtDecode from "jwt-decode";
import { UserRepository } from "src/user/user.repository";
import { VerifyEmailDtoRequest } from "src/auth/dto/request/verify-email.dto-request";
import { ResendVerificationEmailDtoRequest } from "src/auth/dto/request/resend-verification-email.dto-request";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    @Inject("NOTIFICATION_SERVICE") private client: ClientProxy
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

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailConfirmationToken: hashedEmailConfirmationToken
    });

    try {
      await this.userRepository.save(user);
      this.client.emit("email_notification", {
        email,
        emailConfirmationToken: hashedEmailConfirmationToken
      });
    } catch (e) {
      if (e.code === "23505") throw new EmailAlreadyExistsException();
      else new InternalServerErrorException(e);
    }
  }

  async signIn(dto: SignInDtoRequest): Promise<SignInDtoResponse> {
    const { email, password } = dto;
    const user: User = await this.userRepository.findOne({ email });
    if (!user) throw new WrongEmailOrPasswordException();

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new WrongEmailOrPasswordException();

    const payload: JwtPayload = { email };
    const token: string = this.getAccessToken(payload);
    const refreshToken: string = this.getRefreshToken(payload);

    return new SignInDtoResponse(token, refreshToken);
  }

  async refreshToken(
    dto: RefreshTokenDtoRequest
  ): Promise<RefreshTokenDtoResponse> {
    const { refreshToken } = dto;

    try {
      if (
        this.jwtService.verify(refreshToken, {
          secret: configService.getJwtRefreshTokenSecret()
        })
      ) {
        const { email } = jwtDecode<JwtPayload>(refreshToken);
        if (!email) throw new UserNotFoundException();

        const payload = { email };
        const newToken = this.getAccessToken(payload);
        const newRefreshToken = this.getRefreshToken(payload);

        return new RefreshTokenDtoResponse(newToken, newRefreshToken);
      }
    } catch {
      throw new UserNotFoundException();
    }
  }

  async verifyEmail(dto: VerifyEmailDtoRequest): Promise<void> {
    const { emailConfirmationToken } = dto;

    if (
      !this.jwtService.verify(emailConfirmationToken, {
        secret: configService.getEmailConfirmationTokenSecret()
      })
    )
      throw new InvalidEmailVerificationTokenException();

    const { email } = jwtDecode<JwtPayload>(emailConfirmationToken);
    if (!email) throw new UserNotFoundException();

    const user: User = await this.userRepository.expectOne({ email });
    user.emailConfirmationToken = null;
    user.isActive = true;
    await this.userRepository.save(user);
  }

  async resendVerificationEmail(
    dto: ResendVerificationEmailDtoRequest
  ): Promise<void> {
    const { email } = dto;

    const user: User = await this.userRepository.expectOne({ email });
    const salt = await bcrypt.genSalt();
    const emailConfirmationToken: string = this.getEmailConfirmationToken({
      email
    });
    const hashedEmailConfirmationToken: string = bcrypt.hash(
      emailConfirmationToken,
      salt
    );

    await this.userRepository.save({
      ...user,
      emailConfirmationToken: hashedEmailConfirmationToken
    });
    this.client.emit("email_notification", { email, emailConfirmationToken });
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
