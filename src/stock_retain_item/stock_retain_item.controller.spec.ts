import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainItemController } from './stock_retain_item.controller';
import { StockRetainItemService } from './stock_retain_item.service';

describe('StockRetainItemController', () => {
  let controller: StockRetainItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockRetainItemController],
      providers: [StockRetainItemService],
    }).compile();

    controller = module.get<StockRetainItemController>(StockRetainItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
