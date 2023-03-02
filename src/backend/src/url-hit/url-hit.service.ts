import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { UpdateUrlHitDto } from "./dto/update-url-hit.dto";
import { CreateUrlHitDtoRequest } from "src/url-hit/dto/request/create-url-hit.dto-request";
import { CreateUrlHitDtoResponse } from "src/url-hit/dto/response/create-url-hit.dto-response";
import { InjectRepository } from "@nestjs/typeorm";
import { UrlHit } from "src/url-hit/entities/url-hit.entity";
import { Repository } from "typeorm";
import { Url } from "src/url/entities/url.entity";
import { UrlHitMapper } from "src/url-hit/url-hit.mapper";

@Injectable()
export class UrlHitService {
  constructor(
    @InjectRepository(UrlHit)
    private urlHitRepository: Repository<UrlHit>,
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private mapper: UrlHitMapper
  ) {}

  async create({
    urlId
  }: CreateUrlHitDtoRequest): Promise<CreateUrlHitDtoResponse> {
    const url: Url = await this.urlRepository.findOne(urlId);

    if (!url) throw new NotFoundException();

    const urlHit = this.urlHitRepository.create({
      url
    });

    try {
      await this.urlHitRepository.save(urlHit);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return this.mapper.maoToCreateUrlHitDtoResponse(urlHit);
  }

  findAll() {
    return `This action returns all urlHit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} urlHit`;
  }

  update(id: number, updateUrlHitDto: UpdateUrlHitDto) {
    return `This action updates a #${id} urlHit`;
  }

  remove(id: number) {
    return `This action removes a #${id} urlHit`;
  }
}
