import { Module } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { LabTestController } from './lab_test.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LabTestController],
  providers: [LabTestService /*, PrismaService*/],
})
export class LabTestModule {}
