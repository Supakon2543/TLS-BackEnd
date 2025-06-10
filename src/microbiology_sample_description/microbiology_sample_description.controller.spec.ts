import { Test, TestingModule } from '@nestjs/testing';
import { MicrobiologySampleDescriptionController } from './microbiology_sample_description.controller';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';

describe('MicrobiologySampleDescriptionController', () => {
  let controller: MicrobiologySampleDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicrobiologySampleDescriptionController],
      providers: [MicrobiologySampleDescriptionService],
    }).compile();

    controller = module.get<MicrobiologySampleDescriptionController>(MicrobiologySampleDescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
