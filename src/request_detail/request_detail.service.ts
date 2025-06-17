import { Injectable } from '@nestjs/common';
import { CreateRequestDetailDto } from './dto/create-request_detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request_detail.dto';

@Injectable()
export class RequestDetailService {
  create(createRequestDetailDto: CreateRequestDetailDto) {
    return 'This action adds a new requestDetail';
  }

  findAll() {
    return `This action returns all requestDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestDetail`;
  }

  update(id: number, updateRequestDetailDto: UpdateRequestDetailDto) {
    return `This action updates a #${id} requestDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestDetail`;
  }
}
