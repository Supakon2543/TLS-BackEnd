import { Test, TestingModule } from '@nestjs/testing';
import { SampleStageService } from './sample_stage.service';

describe('SampleStageService', () => {
  let service: SampleStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleStageService],
    }).compile();

    service = module.get<SampleStageService>(SampleStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
