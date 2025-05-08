import { Test, TestingModule } from '@nestjs/testing';
import { SampleStageController } from './sample_stage.controller';
import { SampleStageService } from './sample_stage.service';

describe('SampleStageController', () => {
  let controller: SampleStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleStageController],
      providers: [SampleStageService],
    }).compile();

    controller = module.get<SampleStageController>(SampleStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
