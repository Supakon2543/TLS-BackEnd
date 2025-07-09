import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiologyParameterController } from './microbiology_parameter.controller';
import { MicrobiologyParameterService } from './microbiology_parameter.service';

describe('MicrobiologyParameterController', () => {
  let controller: MicrobiologyParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicrobiologyParameterController],
      providers: [MicrobiologyParameterService],
    }).compile();

    controller = module.get<MicrobiologyParameterController>(MicrobiologyParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
