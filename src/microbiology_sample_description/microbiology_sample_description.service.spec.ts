import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';

describe('MicrobiologySampleDescriptionService', () => {
  let service: MicrobiologySampleDescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicrobiologySampleDescriptionService],
    }).compile();

    service = module.get<MicrobiologySampleDescriptionService>(MicrobiologySampleDescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
