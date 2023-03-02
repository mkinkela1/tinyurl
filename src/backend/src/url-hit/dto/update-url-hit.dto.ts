import { PartialType } from "@nestjs/swagger";
import { CreateUrlHitDtoResponse } from "src/url-hit/dto/response/create-url-hit.dto-response";

export class UpdateUrlHitDto extends PartialType(CreateUrlHitDtoResponse) {}
