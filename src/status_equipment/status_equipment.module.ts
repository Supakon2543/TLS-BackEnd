import { Module } from '@nestjs/common';
import { StatusEquipmentService } from './status_equipment.service';
import { StatusEquipmentController } from './status_equipment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatusEquipmentController],
  providers: [StatusEquipmentService /*, PrismaService*/],
})
export class StatusEquipmentModule {}
