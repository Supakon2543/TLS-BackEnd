import { Module } from '@nestjs/common';
import { RequestDetailAttachmentService } from './request_detail_attachment.service';
import { RequestDetailAttachmentController } from './request_detail_attachment.controller';

@Module({
  controllers: [RequestDetailAttachmentController],
  providers: [RequestDetailAttachmentService],
})
export class RequestDetailAttachmentModule {}
