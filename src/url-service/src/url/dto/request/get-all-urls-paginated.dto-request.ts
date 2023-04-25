import { DtoPaginationRequest } from "src/shared/dto/request/DtoPaginationRequest";
import { BaseGlobalEntity } from "src/shared/base.global-entity";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetAllUrlsPaginatedDtoRequest extends DtoPaginationRequest<BaseGlobalEntity> {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string = null;
}
