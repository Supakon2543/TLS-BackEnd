import { Test, TestingModule } from '@nestjs/testing';
import { SampleTypeService } from './sample_type.service';

describe('SampleTypeService', () => {
  let service: SampleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleTypeService],
    }).compile();

    service = module.get<SampleTypeService>(SampleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
