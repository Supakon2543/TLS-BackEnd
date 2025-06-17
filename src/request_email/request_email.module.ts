import { Module } from '@nestjs/common';
import { RequestEmailService } from './request_email.service';
import { RequestEmailController } from './request_email.controller';

@Module({
  controllers: [RequestEmailController],
  providers: [RequestEmailService],
})
export class RequestEmailModule {}
