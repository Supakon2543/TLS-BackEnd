import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentCalibrationService } from './stock_equipment_calibration.service';

describe('StockEquipmentCalibrationService', () => {
  let service: StockEquipmentCalibrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockEquipmentCalibrationService],
    }).compile();

    service = module.get<StockEquipmentCalibrationService>(StockEquipmentCalibrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
