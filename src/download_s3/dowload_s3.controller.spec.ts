import { Test, TestingModule } from '@nestjs/testing';
import { DownloadS3Controller } from './download_s3.controller';
import { DownloadS3Service } from './download_s3.service';

describe('DownloadS3Controller', () => {
  let controller: DownloadS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadS3Controller],
      providers: [DownloadS3Service],
    }).compile();

    controller = module.get<DownloadS3Controller>(DownloadS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
