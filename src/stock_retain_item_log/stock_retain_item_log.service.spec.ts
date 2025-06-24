import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainItemLogService } from './stock_retain_item_log.service';

describe('StockRetainItemLogService', () => {
  let service: StockRetainItemLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockRetainItemLogService],
    }).compile();

    service = module.get<StockRetainItemLogService>(StockRetainItemLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
