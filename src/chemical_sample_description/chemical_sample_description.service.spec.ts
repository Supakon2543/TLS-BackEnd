import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';

describe('ChemicalSampleDescriptionService', () => {
  let service: ChemicalSampleDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChemicalSampleDescriptionService],
    }).compile();

    service = module.get<ChemicalSampleDescriptionService>(ChemicalSampleDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
