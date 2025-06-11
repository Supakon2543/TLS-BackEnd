import { Test, TestingModule } from '@nestjs/testing';
import { SamplePackagingService } from './sample_packaging.service';

describe('SamplePackagingService', () => {
  let service: SamplePackagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamplePackagingService],
    }).compile();

    service = module.get<SamplePackagingService>(SamplePackagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
