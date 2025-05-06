import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentTypeController } from './equipment_type.controller';
import { EquipmentTypeService } from './equipment_type.service';

describe('EquipmentTypeController', () => {
  let controller: EquipmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentTypeController],
      providers: [EquipmentTypeService],
    }).compile();

    controller = module.get<EquipmentTypeController>(EquipmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
