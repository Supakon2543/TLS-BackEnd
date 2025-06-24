import { Test, TestingModule } from '@nestjs/testing';
import { StockChemicalController } from './stock_chemical.controller';
import { StockChemicalService } from './stock_chemical.service';

describe('StockChemicalController', () => {
  let controller: StockChemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockChemicalController],
      providers: [StockChemicalService],
    }).compile();

    controller = module.get<StockChemicalController>(StockChemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
