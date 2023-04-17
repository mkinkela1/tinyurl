import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Order } from "typeorm-cursor-pagination";
import { Type } from "class-transformer";
import { BaseGlobalEntity } from "src/shared/base.global-entity";

export class DtoPaginationRequest<T extends BaseGlobalEntity> {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  beforeCursor?: string = null;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  afterCursor?: string = null;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @Type(() => Number)
  pageSize?: number = 20;

  @ApiPropertyOptional()
  @IsString()
  sortBy?: keyof T = "createDateTime";

  @ApiPropertyOptional({ enum: Order })
  @IsString()
  orderBy?: Order = Order.ASC;
}
