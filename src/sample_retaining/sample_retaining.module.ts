import { Module } from '@nestjs/common';
import { SampleRetainingService } from './sample_retaining.service';
import { SampleRetainingController } from './sample_retaining.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SampleRetainingController],
  providers: [SampleRetainingService, PrismaService],
})
export class SampleRetainingModule {}
