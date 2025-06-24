import { Module } from '@nestjs/common';
import { StockEquipmentCalibrationService } from './stock_equipment_calibration.service';
import { StockEquipmentCalibrationController } from './stock_equipment_calibration.controller';

@Module({
  controllers: [StockEquipmentCalibrationController],
  providers: [StockEquipmentCalibrationService],
})
export class StockEquipmentCalibrationModule {}
