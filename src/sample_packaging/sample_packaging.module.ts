import { Module } from '@nestjs/common';
import { SamplePackagingService } from './sample_packaging.service';
import { SamplePackagingController } from './sample_packaging.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SamplePackagingController],
  providers: [SamplePackagingService,PrismaService],
})
export class SamplePackagingModule {}
