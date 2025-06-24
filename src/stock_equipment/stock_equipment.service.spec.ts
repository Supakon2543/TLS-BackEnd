import { Test, TestingModule } from '@nestjs/testing';
import { StockEquipmentService } from './stock_equipment.service';

describe('StockEquipmentService', () => {
  let service: StockEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockEquipmentService],
    }).compile();

    service = module.get<StockEquipmentService>(StockEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
