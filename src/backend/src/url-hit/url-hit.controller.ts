import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { UrlHitService } from "./url-hit.service";
import { CreateUrlHitDtoRequest } from "src/url-hit/dto/request/create-url-hit.dto-request";
import { UpdateUrlHitDto } from "./dto/update-url-hit.dto";
import { CreateUrlHitDtoResponse } from "src/url-hit/dto/response/create-url-hit.dto-response";
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";

@ApiTags("URL hit")
@Controller("url-hit")
export class UrlHitController {
  constructor(private readonly urlHitService: UrlHitService) {}

  @Post()
  @ApiExtraModels(CreateUrlHitDtoResponse)
  @ApiResponse({
    schema: {
      $ref: getSchemaPath(CreateUrlHitDtoResponse)
    }
  })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  create(
    @Body() createUrlHitDto: CreateUrlHitDtoRequest
  ): Promise<CreateUrlHitDtoResponse> {
    return this.urlHitService.create(createUrlHitDto);
  }

  @Get()
  findAll() {
    return this.urlHitService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.urlHitService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUrlHitDto: UpdateUrlHitDto) {
    return this.urlHitService.update(+id, updateUrlHitDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.urlHitService.remove(+id);
  }
}
