import { IsUrl } from "class-validator";

export class CreatetUrlDtoRequest {
  @IsUrl()
  longUrl: string;
}
