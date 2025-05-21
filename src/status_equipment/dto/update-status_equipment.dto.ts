import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusEquipmentDto } from './create-status_equipment.dto';

export class UpdateStatusEquipmentDto extends PartialType(CreateStatusEquipmentDto) {}
