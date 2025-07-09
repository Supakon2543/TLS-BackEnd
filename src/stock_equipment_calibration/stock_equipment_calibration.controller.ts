import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockEquipmentCalibrationService } from './stock_equipment_calibration.service';
import { CreateStockEquipmentCalibrationDto } from './dto/create-stock_equipment_calibration.dto';
import { UpdateStockEquipmentCalibrationDto } from './dto/update-stock_equipment_calibration.dto';

@Controller('stock-equipment-calibration')
export class StockEquipmentCalibrationController {
  constructor(private readonly stockEquipmentCalibrationService: StockEquipmentCalibrationService) {}

  @Post()
  create(@Body() createStockEquipmentCalibrationDto: CreateStockEquipmentCalibrationDto) {
    return this.stockEquipmentCalibrationService.create(createStockEquipmentCalibrationDto);
  }

  @Get()
  findAll() {
    return this.stockEquipmentCalibrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEquipmentCalibrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockEquipmentCalibrationDto: UpdateStockEquipmentCalibrationDto) {
    return this.stockEquipmentCalibrationService.update(+id, updateStockEquipmentCalibrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockEquipmentCalibrationService.remove(+id);
  }
}
