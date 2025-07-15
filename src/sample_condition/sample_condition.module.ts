import { Module } from '@nestjs/common';
import { SampleConditionService } from './sample_condition.service';
import { SampleConditionController } from './sample_condition.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SampleConditionController],
  providers: [SampleConditionService /*, PrismaService*/],
})
export class SampleConditionModule {}
