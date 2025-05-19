import { Test, TestingModule } from '@nestjs/testing';
import { LabProcessController } from './lab_process.controller';
import { LabProcessService } from './lab_process.service';

describe('LabProcessController', () => {
  let controller: LabProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabProcessController],
      providers: [LabProcessService],
    }).compile();

    controller = module.get<LabProcessController>(LabProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
