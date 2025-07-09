import { Test, TestingModule } from '@nestjs/testing';
import { LabProcessService } from './lab_process.service';

describe('LabProcessService', () => {
  let service: LabProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabProcessService],
    }).compile();

    service = module.get<LabProcessService>(LabProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
