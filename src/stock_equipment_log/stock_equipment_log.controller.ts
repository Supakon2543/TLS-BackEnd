import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockEquipmentLogService } from './stock_equipment_log.service';
import { CreateStockEquipmentLogDto } from './dto/create-stock_equipment_log.dto';
import { UpdateStockEquipmentLogDto } from './dto/update-stock_equipment_log.dto';

@Controller('stock-equipment-log')
export class StockEquipmentLogController {
  constructor(private readonly stockEquipmentLogService: StockEquipmentLogService) {}

  @Post()
  create(@Body() createStockEquipmentLogDto: CreateStockEquipmentLogDto) {
    return this.stockEquipmentLogService.create(createStockEquipmentLogDto);
  }

  @Get()
  findAll() {
    return this.stockEquipmentLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEquipmentLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockEquipmentLogDto: UpdateStockEquipmentLogDto) {
    return this.stockEquipmentLogService.update(+id, updateStockEquipmentLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockEquipmentLogService.remove(+id);
  }
}
