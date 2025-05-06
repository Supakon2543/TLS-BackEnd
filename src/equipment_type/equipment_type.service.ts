import { Injectable } from '@nestjs/common';
import { CreateEquipmentTypeDto } from './dto/create-equipment_type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment_type.dto';

@Injectable()
export class EquipmentTypeService {
  create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return 'This action adds a new equipmentType';
  }

  findAll() {
    return `This action returns all equipmentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentType`;
  }

  update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return `This action updates a #${id} equipmentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentType`;
  }
}
