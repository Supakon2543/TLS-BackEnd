import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainController } from './stock_retain.controller';
import { StockRetainService } from './stock_retain.service';

describe('StockRetainController', () => {
  let controller: StockRetainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockRetainController],
      providers: [StockRetainService],
    }).compile();

    controller = module.get<StockRetainController>(StockRetainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
