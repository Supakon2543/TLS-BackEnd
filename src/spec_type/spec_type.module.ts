import { Module } from '@nestjs/common';
import { SpecTypeService } from './spec_type.service';
import { SpecTypeController } from './spec_type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SpecTypeController],
  providers: [SpecTypeService, PrismaService],
})
export class SpecTypeModule {}
