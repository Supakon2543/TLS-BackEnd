import { Injectable } from '@nestjs/common';
import { CreateRequestLogDto } from './dto/create-request_log.dto';
import { UpdateRequestLogDto } from './dto/update-request_log.dto';

@Injectable()
export class RequestLogService {
  create(createRequestLogDto: CreateRequestLogDto) {
    return 'This action adds a new requestLog';
  }

  findAll() {
    return `This action returns all requestLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestLog`;
  }

  update(id: number, updateRequestLogDto: UpdateRequestLogDto) {
    return `This action updates a #${id} requestLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestLog`;
  }
}
