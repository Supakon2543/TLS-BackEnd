import { Test, TestingModule } from '@nestjs/testing';
import { PresignService } from './presign.service';

describe('PresignService', () => {
  let service: PresignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresignService],
    }).compile();

    service = module.get<PresignService>(PresignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
