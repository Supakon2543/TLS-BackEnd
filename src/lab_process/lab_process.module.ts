import { Module } from '@nestjs/common';
import { LabProcessService } from './lab_process.service';
import { LabProcessController } from './lab_process.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LabProcessController],
  providers: [LabProcessService, PrismaService],
})
export class LabProcessModule {}
