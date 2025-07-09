import { Test, TestingModule } from '@nestjs/testing';
import { ActivityRequestController } from './activity_request.controller';
import { ActivityRequestService } from './activity_request.service';

describe('ActivityRequestController', () => {
  let controller: ActivityRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityRequestController],
      providers: [ActivityRequestService],
    }).compile();

    controller = module.get<ActivityRequestController>(ActivityRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
