import { Module } from '@nestjs/common';
import { StockEquipmentLogService } from './stock_equipment_log.service';
import { StockEquipmentLogController } from './stock_equipment_log.controller';

@Module({
  controllers: [StockEquipmentLogController],
  providers: [StockEquipmentLogService],
})
export class StockEquipmentLogModule {}
