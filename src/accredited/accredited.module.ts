import { Module } from '@nestjs/common';
import { AccreditedService } from './accredited.service';
import { AccreditedController } from './accredited.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AccreditedController],
  providers: [AccreditedService /*, PrismaService*/],
})
export class AccreditedModule {}
