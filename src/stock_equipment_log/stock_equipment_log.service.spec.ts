import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentLogService } from './stock_equipment_log.service';

describe('StockEquipmentLogService', () => {
  let service: StockEquipmentLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockEquipmentLogService],
    }).compile();

    service = module.get<StockEquipmentLogService>(StockEquipmentLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
