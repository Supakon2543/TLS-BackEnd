import { Test, TestingModule } from '@nestjs/testing';
import { CategoryChemicalService } from './category_chemical.service';

describe('CategoryChemicalService', () => {
  let service: CategoryChemicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryChemicalService],
    }).compile();

    service = module.get<CategoryChemicalService>(CategoryChemicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
