import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainItemLogController } from './stock_retain_item_log.controller';
import { StockRetainItemLogService } from './stock_retain_item_log.service';

describe('StockRetainItemLogController', () => {
  let controller: StockRetainItemLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockRetainItemLogController],
      providers: [StockRetainItemLogService],
    }).compile();

    controller = module.get<StockRetainItemLogController>(StockRetainItemLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
