import { Test, TestingModule } from '@nestjs/testing';
import { StatusSampleService } from './status_sample.service';

describe('StatusSampleService', () => {
  let service: StatusSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusSampleService],
    }).compile();

    service = module.get<StatusSampleService>(StatusSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
