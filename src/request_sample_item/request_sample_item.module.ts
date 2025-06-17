import { Module } from '@nestjs/common';
import { RequestSampleItemService } from './request_sample_item.service';
import { RequestSampleItemController } from './request_sample_item.controller';

@Module({
  controllers: [RequestSampleItemController],
  providers: [RequestSampleItemService],
})
export class RequestSampleItemModule {}
