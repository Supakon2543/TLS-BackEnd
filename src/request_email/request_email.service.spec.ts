import { Test, TestingModule } from '@nestjs/testing';
import { RequestEmailService } from './request_email.service';

describe('RequestEmailService', () => {
  let service: RequestEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestEmailService],
    }).compile();

    service = module.get<RequestEmailService>(RequestEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
