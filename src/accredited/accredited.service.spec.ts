import { Test, TestingModule } from '@nestjs/testing';
import { AccreditedService } from './accredited.service';

describe('AccreditedService', () => {
  let service: AccreditedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccreditedService],
    }).compile();

    service = module.get<AccreditedService>(AccreditedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
