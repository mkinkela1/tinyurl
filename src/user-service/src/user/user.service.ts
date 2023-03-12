import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import CurrentUserDtoResponse from "src/user/dto/response/current-user.dto-response";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getCurrentUser(user: User): Promise<CurrentUserDtoResponse> {
    return new CurrentUserDtoResponse(user);
  }

  findAll() {
    return this.usersRepository.find();
  }
}
