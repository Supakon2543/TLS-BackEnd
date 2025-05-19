import { Module } from '@nestjs/common';
import { ActivityEquipmentService } from './activity_equipment.service';
import { ActivityEquipmentController } from './activity_equipment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivityEquipmentController],
  providers: [ActivityEquipmentService, PrismaService],
})
export class ActivityEquipmentModule {}
