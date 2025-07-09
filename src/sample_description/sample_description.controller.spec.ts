import { Test, TestingModule } from '@nestjs/testing';
import { SampleDescriptionController } from './sample_description.controller';
import { SampleDescriptionService } from './sample_description.service';

describe('SampleDescriptionController', () => {
  let controller: SampleDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleDescriptionController],
      providers: [SampleDescriptionService],
    }).compile();

    controller = module.get<SampleDescriptionController>(SampleDescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
