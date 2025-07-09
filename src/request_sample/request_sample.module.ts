import { Module } from '@nestjs/common';
import { RequestSampleService } from './request_sample.service';
import { RequestSampleController } from './request_sample.controller';

@Module({
  controllers: [RequestSampleController],
  providers: [RequestSampleService],
})
export class RequestSampleModule {}
