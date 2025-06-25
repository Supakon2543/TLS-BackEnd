import { Test, TestingModule } from '@nestjs/testing';
import { DowloadS3Service } from './download_s3.service';

describe('DowloadS3Service', () => {
  let service: DowloadS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DowloadS3Service],
    }).compile();

    service = module.get<DowloadS3Service>(DowloadS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
