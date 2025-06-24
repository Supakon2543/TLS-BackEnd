import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleItemController } from './request_sample_item.controller';
import { RequestSampleItemService } from './request_sample_item.service';

describe('RequestSampleItemController', () => {
  let controller: RequestSampleItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSampleItemController],
      providers: [RequestSampleItemService],
    }).compile();

    controller = module.get<RequestSampleItemController>(RequestSampleItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
