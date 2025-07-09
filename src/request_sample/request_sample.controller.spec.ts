import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleController } from './request_sample.controller';
import { RequestSampleService } from './request_sample.service';

describe('RequestSampleController', () => {
  let controller: RequestSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSampleController],
      providers: [RequestSampleService],
    }).compile();

    controller = module.get<RequestSampleController>(RequestSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
