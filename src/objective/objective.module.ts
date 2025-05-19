import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveController } from './objective.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ObjectiveController],
  providers: [ObjectiveService, PrismaService],
})
export class ObjectiveModule {}
