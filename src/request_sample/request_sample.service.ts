import { Injectable } from '@nestjs/common';
import { CreateRequestSampleDto } from './dto/create-request_sample.dto';
import { UpdateRequestSampleDto } from './dto/update-request_sample.dto';

@Injectable()
export class RequestSampleService {
  create(createRequestSampleDto: CreateRequestSampleDto) {
    return 'This action adds a new requestSample';
  }

  findAll() {
    return `This action returns all requestSample`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestSample`;
  }

  update(id: number, updateRequestSampleDto: UpdateRequestSampleDto) {
    return `This action updates a #${id} requestSample`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestSample`;
  }
}
