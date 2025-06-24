import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleService } from './request_sample.service';

describe('RequestSampleService', () => {
  let service: RequestSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSampleService],
    }).compile();

    service = module.get<RequestSampleService>(RequestSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
