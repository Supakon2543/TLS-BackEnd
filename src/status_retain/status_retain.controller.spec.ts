import { Test, TestingModule } from '@nestjs/testing';
import { StatusRetainController } from './status_retain.controller';
import { StatusRetainService } from './status_retain.service';

describe('StatusRetainController', () => {
  let controller: StatusRetainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusRetainController],
      providers: [StatusRetainService],
    }).compile();

    controller = module.get<StatusRetainController>(StatusRetainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
