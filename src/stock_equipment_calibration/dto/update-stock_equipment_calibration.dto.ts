import { PartialType } from '@nestjs/swagger';
import { CreateStockEquipmentCalibrationDto } from './create-stock_equipment_calibration.dto';

export class UpdateStockEquipmentCalibrationDto extends PartialType(CreateStockEquipmentCalibrationDto) {}
