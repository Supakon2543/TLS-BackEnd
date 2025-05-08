import { Test, TestingModule } from '@nestjs/testing';
import { MaterialMicrobiologyController } from './material_microbiology.controller';
import { MaterialMicrobiologyService } from './material_microbiology.service';

describe('MaterialMicrobiologyController', () => {
  let controller: MaterialMicrobiologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialMicrobiologyController],
      providers: [MaterialMicrobiologyService],
    }).compile();

    controller = module.get<MaterialMicrobiologyController>(MaterialMicrobiologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
