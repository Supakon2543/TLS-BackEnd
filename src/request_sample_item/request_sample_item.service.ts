import { Injectable } from '@nestjs/common';
import { CreateRequestSampleItemDto } from './dto/create-request_sample_item.dto';
import { UpdateRequestSampleItemDto } from './dto/update-request_sample_item.dto';

@Injectable()
export class RequestSampleItemService {
  create(createRequestSampleItemDto: CreateRequestSampleItemDto) {
    return 'This action adds a new requestSampleItem';
  }

  findAll() {
    return `This action returns all requestSampleItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestSampleItem`;
  }

  update(id: number, updateRequestSampleItemDto: UpdateRequestSampleItemDto) {
    return `This action updates a #${id} requestSampleItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestSampleItem`;
  }
}
