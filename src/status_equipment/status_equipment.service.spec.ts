import { Test, TestingModule } from '@nestjs/testing';
import { StatusEquipmentService } from './status_equipment.service';

describe('StatusEquipmentService', () => {
  let service: StatusEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusEquipmentService],
    }).compile();

    service = module.get<StatusEquipmentService>(StatusEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
