import { Test, TestingModule } from '@nestjs/testing';
import { ActivityEquipmentController } from './activity_equipment.controller';
import { ActivityEquipmentService } from './activity_equipment.service';

describe('ActivityEquipmentController', () => {
  let controller: ActivityEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityEquipmentController],
      providers: [ActivityEquipmentService],
    }).compile();

    controller = module.get<ActivityEquipmentController>(ActivityEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
