import { Module } from '@nestjs/common';
import { ReportHeadingService } from './report_heading.service';
import { ReportHeadingController } from './report_heading.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReportHeadingController],
  providers: [ReportHeadingService, PrismaService],
})
export class ReportHeadingModule {}
