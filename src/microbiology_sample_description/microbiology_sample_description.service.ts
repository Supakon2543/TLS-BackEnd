import { Injectable } from '@nestjs/common';
import { CreateMicrobiologySampleDescriptionDto } from './dto/create-microbiology_sample_description.dto';
import { UpdateMicrobiologySampleDescriptionDto } from './dto/update-microbiology_sample_description.dto';

@Injectable()
export class MicrobiologySampleDescriptionService {
  create(createMicrobiologySampleDescriptionDto: CreateMicrobiologySampleDescriptionDto) {
    return 'This action adds a new microbiologySampleDescription';
  }

  findAll() {
    return `This action returns all microbiologySampleDescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} microbiologySampleDescription`;
  }

  update(id: number, updateMicrobiologySampleDescriptionDto: UpdateMicrobiologySampleDescriptionDto) {
    return `This action updates a #${id} microbiologySampleDescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} microbiologySampleDescription`;
  }
}
