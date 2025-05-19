import { Test, TestingModule } from '@nestjs/testing';
import { SpecTypeService } from './spec_type.service';

describe('SpecTypeService', () => {
  let service: SpecTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecTypeService],
    }).compile();

    service = module.get<SpecTypeService>(SpecTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
