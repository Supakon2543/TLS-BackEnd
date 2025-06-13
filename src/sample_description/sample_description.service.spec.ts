import { Test, TestingModule } from '@nestjs/testing';
import { SampleDescriptionService } from './sample_description.service';

describe('SampleDescriptionService', () => {
  let service: SampleDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleDescriptionService],
    }).compile();

    service = module.get<SampleDescriptionService>(SampleDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
