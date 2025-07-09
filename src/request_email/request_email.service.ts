import { Injectable } from '@nestjs/common';
import { CreateRequestEmailDto } from './dto/create-request_email.dto';
import { UpdateRequestEmailDto } from './dto/update-request_email.dto';

@Injectable()
export class RequestEmailService {
  create(createRequestEmailDto: CreateRequestEmailDto) {
    return 'This action adds a new requestEmail';
  }

  findAll() {
    return `This action returns all requestEmail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestEmail`;
  }

  update(id: number, updateRequestEmailDto: UpdateRequestEmailDto) {
    return `This action updates a #${id} requestEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestEmail`;
  }
}
