import { Test, TestingModule } from '@nestjs/testing';
import { RequestSampleMicrobiologyController } from './request_sample_microbiology.controller';
import { RequestSampleMicrobiologyService } from './request_sample_microbiology.service';

describe('RequestSampleMicrobiologyController', () => {
  let controller: RequestSampleMicrobiologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestSampleMicrobiologyController],
      providers: [RequestSampleMicrobiologyService],
    }).compile();

    controller = module.get<RequestSampleMicrobiologyController>(RequestSampleMicrobiologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
