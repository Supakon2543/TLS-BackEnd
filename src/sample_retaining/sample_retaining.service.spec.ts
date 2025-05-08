import { Test, TestingModule } from '@nestjs/testing';
import { SampleRetainingService } from './sample_retaining.service';

describe('SampleRetainingService', () => {
  let service: SampleRetainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleRetainingService],
    }).compile();

    service = module.get<SampleRetainingService>(SampleRetainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
