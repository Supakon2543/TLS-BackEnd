import { Test, TestingModule } from '@nestjs/testing';
import { StatusSampleController } from './status_sample.controller';
import { StatusSampleService } from './status_sample.service';

describe('StatusSampleController', () => {
  let controller: StatusSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusSampleController],
      providers: [StatusSampleService],
    }).compile();

    controller = module.get<StatusSampleController>(StatusSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
