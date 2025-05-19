import { Test, TestingModule } from '@nestjs/testing';
import { StatusRetainService } from './status_retain.service';

describe('StatusRetainService', () => {
  let service: StatusRetainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusRetainService],
    }).compile();

    service = module.get<StatusRetainService>(StatusRetainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
