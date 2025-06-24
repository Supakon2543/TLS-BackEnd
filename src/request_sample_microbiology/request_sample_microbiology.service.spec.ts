import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleMicrobiologyService } from './request_sample_microbiology.service';

describe('RequestSampleMicrobiologyService', () => {
  let service: RequestSampleMicrobiologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSampleMicrobiologyService],
    }).compile();

    service = module.get<RequestSampleMicrobiologyService>(RequestSampleMicrobiologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
