import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleChemicalService } from './request_sample_chemical.service';

describe('RequestSampleChemicalService', () => {
  let service: RequestSampleChemicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestSampleChemicalService],
    }).compile();

    service = module.get<RequestSampleChemicalService>(RequestSampleChemicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
