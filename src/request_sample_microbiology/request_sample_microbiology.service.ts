import { Injectable } from '@nestjs/common';
import { CreateRequestSampleMicrobiologyDto } from './dto/create-request_sample_microbiology.dto';
import { UpdateRequestSampleMicrobiologyDto } from './dto/update-request_sample_microbiology.dto';

@Injectable()
export class RequestSampleMicrobiologyService {
  create(createRequestSampleMicrobiologyDto: CreateRequestSampleMicrobiologyDto) {
    return 'This action adds a new requestSampleMicrobiology';
  }

  findAll() {
    return `This action returns all requestSampleMicrobiology`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestSampleMicrobiology`;
  }

  update(id: number, updateRequestSampleMicrobiologyDto: UpdateRequestSampleMicrobiologyDto) {
    return `This action updates a #${id} requestSampleMicrobiology`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestSampleMicrobiology`;
  }
}
