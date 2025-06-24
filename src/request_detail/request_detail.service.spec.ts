import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailService } from './request_detail.service';

describe('RequestDetailService', () => {
  let service: RequestDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestDetailService],
    }).compile();

    service = module.get<RequestDetailService>(RequestDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
