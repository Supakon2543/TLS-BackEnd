import { Injectable } from '@nestjs/common';
import { CreateRequestSampleChemicalDto } from './dto/create-request_sample_chemical.dto';
import { UpdateRequestSampleChemicalDto } from './dto/update-request_sample_chemical.dto';

@Injectable()
export class RequestSampleChemicalService {
  create(createRequestSampleChemicalDto: CreateRequestSampleChemicalDto) {
    return 'This action adds a new requestSampleChemical';
  }

  findAll() {
    return `This action returns all requestSampleChemical`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestSampleChemical`;
  }

  update(id: number, updateRequestSampleChemicalDto: UpdateRequestSampleChemicalDto) {
    return `This action updates a #${id} requestSampleChemical`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestSampleChemical`;
  }
}
