import { Injectable } from '@nestjs/common';
import { CreateStockEquipmentLogDto } from './dto/create-stock_equipment_log.dto';
import { UpdateStockEquipmentLogDto } from './dto/update-stock_equipment_log.dto';

@Injectable()
export class StockEquipmentLogService {
  create(createStockEquipmentLogDto: CreateStockEquipmentLogDto) {
    return 'This action adds a new stockEquipmentLog';
  }

  findAll() {
    return `This action returns all stockEquipmentLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockEquipmentLog`;
  }

  update(id: number, updateStockEquipmentLogDto: UpdateStockEquipmentLogDto) {
    return `This action updates a #${id} stockEquipmentLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockEquipmentLog`;
  }
}
