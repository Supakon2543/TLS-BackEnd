import { Module } from '@nestjs/common';
import { StockEquipmentService } from './stock_equipment.service';
import { StockEquipmentController } from './stock_equipment.controller';

@Module({
  controllers: [StockEquipmentController],
  providers: [StockEquipmentService],
})
export class StockEquipmentModule {}
