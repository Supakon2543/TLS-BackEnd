import { Test, TestingModule } from '@nestjs/testing';
import { RequestEmailController } from './request_email.controller';
import { RequestEmailService } from './request_email.service';

describe('RequestEmailController', () => {
  let controller: RequestEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestEmailController],
      providers: [RequestEmailService],
    }).compile();

    controller = module.get<RequestEmailController>(RequestEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
