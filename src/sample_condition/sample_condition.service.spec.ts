import { Test, TestingModule } from '@nestjs/testing';
import { SampleConditionService } from './sample_condition.service';

describe('SampleConditionService', () => {
  let service: SampleConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleConditionService],
    }).compile();

    service = module.get<SampleConditionService>(SampleConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
