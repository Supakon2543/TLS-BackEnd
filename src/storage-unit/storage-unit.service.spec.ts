import { Test, TestingModule } from '@nestjs/testing';
import { StorageUnitService } from './storage-unit.service';

describe('StorageUnitService', () => {
  let service: StorageUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageUnitService],
    }).compile();

    service = module.get<StorageUnitService>(StorageUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
