import { Module } from '@nestjs/common';
import { ActivityRequestService } from './activity_request.service';
import { ActivityRequestController } from './activity_request.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivityRequestController],
  providers: [ActivityRequestService, PrismaService],
})
export class ActivityRequestModule {}
