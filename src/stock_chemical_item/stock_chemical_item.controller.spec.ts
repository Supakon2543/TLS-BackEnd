import { Test, TestingModule } from '@nestjs/testing';
import { StockChemicalItemController } from './stock_chemical_item.controller';
import { StockChemicalItemService } from './stock_chemical_item.service';

describe('StockChemicalItemController', () => {
  let controller: StockChemicalItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockChemicalItemController],
      providers: [StockChemicalItemService],
    }).compile();

    controller = module.get<StockChemicalItemController>(StockChemicalItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
