import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockEquipmentService } from './stock_equipment.service';
import { CreateStockEquipmentDto } from './dto/create-stock_equipment.dto';
import { UpdateStockEquipmentDto } from './dto/update-stock_equipment.dto';

@Controller('stock-equipment')
export class StockEquipmentController {
  constructor(private readonly stockEquipmentService: StockEquipmentService) {}

  @Post()
  create(@Body() createStockEquipmentDto: CreateStockEquipmentDto) {
    return this.stockEquipmentService.create(createStockEquipmentDto);
  }

  @Get()
  findAll() {
    return this.stockEquipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEquipmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockEquipmentDto: UpdateStockEquipmentDto) {
    return this.stockEquipmentService.update(+id, updateStockEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockEquipmentService.remove(+id);
  }
}
