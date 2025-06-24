import { PartialType } from '@nestjs/swagger';
import { CreateStockEquipmentDto } from './create-stock_equipment.dto';

export class UpdateStockEquipmentDto extends PartialType(CreateStockEquipmentDto) {}
