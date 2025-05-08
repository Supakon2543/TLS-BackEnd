import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalParameterService } from './chemical_parameter.service';

describe('ChemicalParameterService', () => {
  let service: ChemicalParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChemicalParameterService],
    }).compile();

    service = module.get<ChemicalParameterService>(ChemicalParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
