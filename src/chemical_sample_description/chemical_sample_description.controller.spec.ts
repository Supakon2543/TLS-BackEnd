import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalSampleDescriptionController } from './chemical_sample_description.controller';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';

describe('ChemicalSampleDescriptionController', () => {
  let controller: ChemicalSampleDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChemicalSampleDescriptionController],
      providers: [ChemicalSampleDescriptionService],
    }).compile();

    controller = module.get<ChemicalSampleDescriptionController>(ChemicalSampleDescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
