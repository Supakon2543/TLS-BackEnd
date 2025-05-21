import { Module } from '@nestjs/common';
import { TestReportFormatService } from './test_report_format.service';
import { TestReportFormatController } from './test_report_format.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TestReportFormatController],
  providers: [TestReportFormatService, PrismaService],
})
export class TestReportFormatModule {}
