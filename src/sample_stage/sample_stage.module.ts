import { Module } from '@nestjs/common';
import { SampleStageService } from './sample_stage.service';
import { SampleStageController } from './sample_stage.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SampleStageController],
  providers: [SampleStageService, PrismaService],
})
export class SampleStageModule {}
