import { Module } from '@nestjs/common';
import { PresignService } from './presign.service';
import { PresignController } from './presign.controller';

@Module({
  controllers: [PresignController],
  providers: [PresignService],
})
export class PresignModule {}
