import { Test, TestingModule } from '@nestjs/testing';
import { StockChemicalService } from './stock_chemical.service';

describe('StockChemicalService', () => {
  let service: StockChemicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockChemicalService],
    }).compile();

    service = module.get<StockChemicalService>(StockChemicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
