import { Module } from '@nestjs/common';
import { RequestLogService } from './request_log.service';
import { RequestLogController } from './request_log.controller';

@Module({
  controllers: [RequestLogController],
  providers: [RequestLogService],
})
export class RequestLogModule {}
