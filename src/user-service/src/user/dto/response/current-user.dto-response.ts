import { ApiResponseProperty } from "@nestjs/swagger";

export default class CurrentUserDtoResponse {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(obj: Partial<CurrentUserDtoResponse>) {
    this.id = obj.id;
    this.email = obj.email;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }
}
