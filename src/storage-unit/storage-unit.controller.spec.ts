import { Test, TestingModule } from '@nestjs/testing';
import { StorageUnitController } from './storage-unit.controller';
import { StorageUnitService } from './storage-unit.service';

describe('StorageUnitController', () => {
  let controller: StorageUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageUnitController],
      providers: [StorageUnitService],
    }).compile();

    controller = module.get<StorageUnitController>(StorageUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
