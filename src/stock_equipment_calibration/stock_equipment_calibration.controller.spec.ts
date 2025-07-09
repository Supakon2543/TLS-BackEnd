import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentCalibrationController } from './stock_equipment_calibration.controller';
import { StockEquipmentCalibrationService } from './stock_equipment_calibration.service';

describe('StockEquipmentCalibrationController', () => {
  let controller: StockEquipmentCalibrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockEquipmentCalibrationController],
      providers: [StockEquipmentCalibrationService],
    }).compile();

    controller = module.get<StockEquipmentCalibrationController>(StockEquipmentCalibrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
