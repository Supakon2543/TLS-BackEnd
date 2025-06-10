import { Injectable } from '@nestjs/common';
import { CreateChemicalSampleDescriptionDto } from './dto/create-chemical_sample_description.dto';
import { UpdateChemicalSampleDescriptionDto } from './dto/update-chemical_sample_description.dto';

@Injectable()
export class ChemicalSampleDescriptionService {
  create(createChemicalSampleDescriptionDto: CreateChemicalSampleDescriptionDto) {
    return 'This action adds a new chemicalSampleDescription';
  }

  findAll() {
    return `This action returns all chemicalSampleDescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chemicalSampleDescription`;
  }

  update(id: number, updateChemicalSampleDescriptionDto: UpdateChemicalSampleDescriptionDto) {
    return `This action updates a #${id} chemicalSampleDescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} chemicalSampleDescription`;
  }
}
