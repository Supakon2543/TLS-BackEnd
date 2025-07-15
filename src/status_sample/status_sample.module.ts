import { Module } from '@nestjs/common';
import { StatusSampleService } from './status_sample.service';
import { StatusSampleController } from './status_sample.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatusSampleController],
  providers: [StatusSampleService /*, PrismaService*/],
})
export class StatusSampleModule {}
