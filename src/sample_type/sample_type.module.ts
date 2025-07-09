import { Module } from '@nestjs/common';
import { SampleTypeService } from './sample_type.service';
import { SampleTypeController } from './sample_type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SampleTypeController],
  providers: [SampleTypeService, PrismaService],
})
export class SampleTypeModule {}
