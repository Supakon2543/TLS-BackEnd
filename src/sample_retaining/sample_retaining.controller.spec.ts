import { Test, TestingModule } from '@nestjs/testing';
import { SampleRetainingController } from './sample_retaining.controller';
import { SampleRetainingService } from './sample_retaining.service';

describe('SampleRetainingController', () => {
  let controller: SampleRetainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleRetainingController],
      providers: [SampleRetainingService],
    }).compile();

    controller = module.get<SampleRetainingController>(SampleRetainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
