import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentLogController } from './stock_equipment_log.controller';
import { StockEquipmentLogService } from './stock_equipment_log.service';

describe('StockEquipmentLogController', () => {
  let controller: StockEquipmentLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockEquipmentLogController],
      providers: [StockEquipmentLogService],
    }).compile();

    controller = module.get<StockEquipmentLogController>(StockEquipmentLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
