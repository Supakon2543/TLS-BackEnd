import { PartialType } from '@nestjs/swagger';
import { CreateStockEquipmentLogDto } from './create-stock_equipment_log.dto';

export class UpdateStockEquipmentLogDto extends PartialType(CreateStockEquipmentLogDto) {}
