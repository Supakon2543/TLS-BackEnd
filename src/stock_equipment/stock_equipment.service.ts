import { Injectable } from '@nestjs/common';
import { CreateStockEquipmentDto } from './dto/create-stock_equipment.dto';
import { UpdateStockEquipmentDto } from './dto/update-stock_equipment.dto';

@Injectable()
export class StockEquipmentService {
  create(createStockEquipmentDto: CreateStockEquipmentDto) {
    return 'This action adds a new stockEquipment';
  }

  findAll() {
    return `This action returns all stockEquipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockEquipment`;
  }

  update(id: number, updateStockEquipmentDto: UpdateStockEquipmentDto) {
    return `This action updates a #${id} stockEquipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockEquipment`;
  }
}
