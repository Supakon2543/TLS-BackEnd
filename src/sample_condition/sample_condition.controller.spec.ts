import { Test, TestingModule } from '@nestjs/testing';
import { SampleConditionController } from './sample_condition.controller';
import { SampleConditionService } from './sample_condition.service';

describe('SampleConditionController', () => {
  let controller: SampleConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleConditionController],
      providers: [SampleConditionService],
    }).compile();

    controller = module.get<SampleConditionController>(SampleConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
