import { Test, TestingModule } from '@nestjs/testing';
import { AccreditedController } from './accredited.controller';
import { AccreditedService } from './accredited.service';

describe('AccreditedController', () => {
  let controller: AccreditedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccreditedController],
      providers: [AccreditedService],
    }).compile();

    controller = module.get<AccreditedController>(AccreditedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
