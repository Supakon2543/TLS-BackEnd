import { Test, TestingModule } from '@nestjs/testing';
import { LabTestController } from './lab_test.controller';
import { LabTestService } from './lab_test.service';

describe('LabTestController', () => {
  let controller: LabTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabTestController],
      providers: [LabTestService],
    }).compile();

    controller = module.get<LabTestController>(LabTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
