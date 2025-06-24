import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleChemicalController } from './request_sample_chemical.controller';
import { RequestSampleChemicalService } from './request_sample_chemical.service';

describe('RequestSampleChemicalController', () => {
  let controller: RequestSampleChemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSampleChemicalController],
      providers: [RequestSampleChemicalService],
    }).compile();

    controller = module.get<RequestSampleChemicalController>(RequestSampleChemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
