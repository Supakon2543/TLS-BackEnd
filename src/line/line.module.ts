import { Module } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LineController],
  providers: [LineService, PrismaService],
})
export class LineModule {}
