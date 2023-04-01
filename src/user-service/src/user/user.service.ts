import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import CurrentUserDtoResponse from "src/user/dto/response/current-user.dto-response";
import { UserRepository } from "src/user/user.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async getCurrentUser(user: User): Promise<CurrentUserDtoResponse> {
    return new CurrentUserDtoResponse(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}
