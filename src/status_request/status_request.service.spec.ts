import { Test, TestingModule } from '@nestjs/testing';
import { StatusRequestService } from './status_request.service';

describe('StatusRequestService', () => {
  let service: StatusRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusRequestService],
    }).compile();

    service = module.get<StatusRequestService>(StatusRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
