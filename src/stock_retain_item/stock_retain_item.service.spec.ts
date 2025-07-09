import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainItemService } from './stock_retain_item.service';

describe('StockRetainItemService', () => {
  let service: StockRetainItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockRetainItemService],
    }).compile();

    service = module.get<StockRetainItemService>(StockRetainItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
