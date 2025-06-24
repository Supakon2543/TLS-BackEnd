import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainService } from './stock_retain.service';

describe('StockRetainService', () => {
  let service: StockRetainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockRetainService],
    }).compile();

    service = module.get<StockRetainService>(StockRetainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
