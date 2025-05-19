import { Test, TestingModule } from '@nestjs/testing';
import { SpecTypeController } from './spec_type.controller';
import { SpecTypeService } from './spec_type.service';

describe('SpecTypeController', () => {
  let controller: SpecTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecTypeController],
      providers: [SpecTypeService],
    }).compile();

    controller = module.get<SpecTypeController>(SpecTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
