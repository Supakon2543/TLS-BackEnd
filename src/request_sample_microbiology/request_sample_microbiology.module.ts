import { Module } from '@nestjs/common';
import { RequestSampleMicrobiologyService } from './request_sample_microbiology.service';
import { RequestSampleMicrobiologyController } from './request_sample_microbiology.controller';

@Module({
  controllers: [RequestSampleMicrobiologyController],
  providers: [RequestSampleMicrobiologyService],
})
export class RequestSampleMicrobiologyModule {}
