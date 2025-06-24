import { Test, TestingModule } from '@nestjs/testing';
import { StockChemicalItemService } from './stock_chemical_item.service';

describe('StockChemicalItemService', () => {
  let service: StockChemicalItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockChemicalItemService],
    }).compile();

    service = module.get<StockChemicalItemService>(StockChemicalItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
