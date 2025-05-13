import { Test, TestingModule } from '@nestjs/testing';
import { ActivityEquipmentService } from './activity_equipment.service';

describe('ActivityEquipmentService', () => {
  let service: ActivityEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityEquipmentService],
    }).compile();

    service = module.get<ActivityEquipmentService>(ActivityEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
