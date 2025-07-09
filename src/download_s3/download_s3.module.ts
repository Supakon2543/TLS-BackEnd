import { Module } from '@nestjs/common';
import { DownloadS3Service } from './download_s3.service';
import { DownloadS3Controller } from './download_s3.controller';

@Module({
  controllers: [DownloadS3Controller],
  providers: [DownloadS3Service],
})
export class DowloadS3Module {}
