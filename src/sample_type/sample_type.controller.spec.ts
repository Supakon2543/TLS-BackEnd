import { Test, TestingModule } from '@nestjs/testing';
import { SampleTypeController } from './sample_type.controller';
import { SampleTypeService } from './sample_type.service';

describe('SampleTypeController', () => {
  let controller: SampleTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleTypeController],
      providers: [SampleTypeService],
    }).compile();

    controller = module.get<SampleTypeController>(SampleTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
