import { Test, TestingModule } from '@nestjs/testing';
import { MaterialChemicalService } from './material_chemical.service';

describe('MaterialChemicalService', () => {
  let service: MaterialChemicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialChemicalService],
    }).compile();

    service = module.get<MaterialChemicalService>(MaterialChemicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
