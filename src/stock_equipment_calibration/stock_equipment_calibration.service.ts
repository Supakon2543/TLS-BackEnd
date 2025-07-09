import { Injectable } from '@nestjs/common';
import { CreateStockEquipmentCalibrationDto } from './dto/create-stock_equipment_calibration.dto';
import { UpdateStockEquipmentCalibrationDto } from './dto/update-stock_equipment_calibration.dto';

@Injectable()
export class StockEquipmentCalibrationService {
  create(createStockEquipmentCalibrationDto: CreateStockEquipmentCalibrationDto) {
    return 'This action adds a new stockEquipmentCalibration';
  }

  findAll() {
    return `This action returns all stockEquipmentCalibration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockEquipmentCalibration`;
  }

  update(id: number, updateStockEquipmentCalibrationDto: UpdateStockEquipmentCalibrationDto) {
    return `This action updates a #${id} stockEquipmentCalibration`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockEquipmentCalibration`;
  }
}
