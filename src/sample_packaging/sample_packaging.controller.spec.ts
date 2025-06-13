import { Test, TestingModule } from '@nestjs/testing';
import { SamplePackagingController } from './sample_packaging.controller';
import { SamplePackagingService } from './sample_packaging.service';

describe('SamplePackagingController', () => {
  let controller: SamplePackagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamplePackagingController],
      providers: [SamplePackagingService],
    }).compile();

    controller = module.get<SamplePackagingController>(SamplePackagingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
