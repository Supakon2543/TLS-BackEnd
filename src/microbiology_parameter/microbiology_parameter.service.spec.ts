import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiologyParameterService } from './microbiology_parameter.service';

describe('MicrobiologyParameterService', () => {
  let service: MicrobiologyParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicrobiologyParameterService],
    }).compile();

    service = module.get<MicrobiologyParameterService>(MicrobiologyParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
