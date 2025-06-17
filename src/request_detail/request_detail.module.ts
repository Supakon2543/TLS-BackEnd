import { Module } from '@nestjs/common';
import { RequestDetailService } from './request_detail.service';
import { RequestDetailController } from './request_detail.controller';

@Module({
  controllers: [RequestDetailController],
  providers: [RequestDetailService],
})
export class RequestDetailModule {}
