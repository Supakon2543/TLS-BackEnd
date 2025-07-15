import { Module } from '@nestjs/common';
import { RequestTypeService } from './request_type.service';
import { RequestTypeController } from './request_type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RequestTypeController],
  providers: [RequestTypeService /*, PrismaService*/],
})
export class RequestTypeModule {}
