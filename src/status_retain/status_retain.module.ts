import { Module } from '@nestjs/common';
import { StatusRetainService } from './status_retain.service';
import { StatusRetainController } from './status_retain.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatusRetainController],
  providers: [StatusRetainService /*, PrismaService*/],
})
export class StatusRetainModule {}
