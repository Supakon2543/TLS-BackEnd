import { Test, TestingModule } from '@nestjs/testing';
import { MaterialMicrobiologyService } from './material_microbiology.service';

describe('MaterialMicrobiologyService', () => {
  let service: MaterialMicrobiologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialMicrobiologyService],
    }).compile();

    service = module.get<MaterialMicrobiologyService>(MaterialMicrobiologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
