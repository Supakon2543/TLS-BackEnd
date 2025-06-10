import { Module } from '@nestjs/common';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';
import { MicrobiologySampleDescriptionController } from './microbiology_sample_description.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MicrobiologySampleDescriptionController],
  providers: [MicrobiologySampleDescriptionService,PrismaService],
})
export class MicrobiologySampleDescriptionModule {}
