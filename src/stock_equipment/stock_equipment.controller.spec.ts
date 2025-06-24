import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentController } from './stock_equipment.controller';
import { StockEquipmentService } from './stock_equipment.service';

describe('StockEquipmentController', () => {
  let controller: StockEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockEquipmentController],
      providers: [StockEquipmentService],
    }).compile();

    controller = module.get<StockEquipmentController>(StockEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
