import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityEquipmentDto } from './create-activity_equipment.dto';

export class UpdateActivityEquipmentDto extends PartialType(CreateActivityEquipmentDto) {}
