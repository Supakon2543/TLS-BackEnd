import { Module } from '@nestjs/common';
import { SampleDescriptionService } from './sample_description.service';
import { SampleDescriptionController } from './sample_description.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SampleDescriptionController],
  providers: [SampleDescriptionService, PrismaService],
})
export class SampleDescriptionModule {}
