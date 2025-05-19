import { Test, TestingModule } from '@nestjs/testing';
import { ActivityRequestService } from './activity_request.service';

describe('ActivityRequestService', () => {
  let service: ActivityRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityRequestService],
    }).compile();

    service = module.get<ActivityRequestService>(ActivityRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
