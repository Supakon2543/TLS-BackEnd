import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment_type.service';
import { EquipmentTypeController } from './equipment_type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EquipmentTypeController],
  providers: [EquipmentTypeService /*, PrismaService*/],
})
export class EquipmentTypeModule {}
