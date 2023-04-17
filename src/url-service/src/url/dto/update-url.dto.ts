import { PartialType } from "@nestjs/swagger";
import { CreateUrlDtoRequest } from "src/url/dto/request/create-url.dto-request";

export class UpdateUrlDto extends PartialType(CreateUrlDtoRequest) {}
