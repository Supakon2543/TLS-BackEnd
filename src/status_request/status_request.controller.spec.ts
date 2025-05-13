import { Test, TestingModule } from '@nestjs/testing';
import { StatusRequestController } from './status_request.controller';
import { StatusRequestService } from './status_request.service';

describe('StatusRequestController', () => {
  let controller: StatusRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusRequestController],
      providers: [StatusRequestService],
    }).compile();

    controller = module.get<StatusRequestController>(StatusRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
