import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UserNotFoundException } from "src/exceptions/UserExceptions";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
  async expectOne(where: any): Promise<User> {
    const user: User = await this.findOne({ where });

    if (!user) throw new UserNotFoundException();

    return user;
  }
}
