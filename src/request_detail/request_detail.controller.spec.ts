import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailController } from './request_detail.controller';
import { RequestDetailService } from './request_detail.service';

describe('RequestDetailController', () => {
  let controller: RequestDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestDetailController],
      providers: [RequestDetailService],
    }).compile();

    controller = module.get<RequestDetailController>(RequestDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
