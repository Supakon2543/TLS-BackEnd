import { Module } from '@nestjs/common';
import { StatusRequestService } from './status_request.service';
import { StatusRequestController } from './status_request.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatusRequestController],
  providers: [StatusRequestService, PrismaService],
})
export class StatusRequestModule {}
