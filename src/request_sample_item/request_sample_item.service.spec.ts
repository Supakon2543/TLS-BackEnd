import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleItemService } from './request_sample_item.service';

describe('RequestSampleItemService', () => {
  let service: RequestSampleItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSampleItemService],
    }).compile();

    service = module.get<RequestSampleItemService>(RequestSampleItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
