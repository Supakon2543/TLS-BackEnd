import { Test, TestingModule } from '@nestjs/testing';
import { StatusEquipmentController } from './status_equipment.controller';
import { StatusEquipmentService } from './status_equipment.service';

describe('StatusEquipmentController', () => {
  let controller: StatusEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusEquipmentController],
      providers: [StatusEquipmentService],
    }).compile();

    controller = module.get<StatusEquipmentController>(StatusEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
