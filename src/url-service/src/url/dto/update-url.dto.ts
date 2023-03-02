import { PartialType } from "@nestjs/swagger";
import { CreatetUrlDtoRequest } from "src/url/dto/request/createt-url.dto-request";

export class UpdateUrlDto extends PartialType(CreatetUrlDtoRequest) {}
