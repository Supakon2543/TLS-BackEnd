import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockChemicalItemService } from './stock_chemical_item.service';
import { CreateStockChemicalItemDto } from './dto/create-stock_chemical_item.dto';
import { UpdateStockChemicalItemDto } from './dto/update-stock_chemical_item.dto';

@Controller('stock-chemical-item')
export class StockChemicalItemController {
  constructor(private readonly stockChemicalItemService: StockChemicalItemService) {}

  @Post()
  create(@Body() createStockChemicalItemDto: CreateStockChemicalItemDto) {
    return this.stockChemicalItemService.create(createStockChemicalItemDto);
  }

  @Get()
  findAll() {
    return this.stockChemicalItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockChemicalItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockChemicalItemDto: UpdateStockChemicalItemDto) {
    return this.stockChemicalItemService.update(+id, updateStockChemicalItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockChemicalItemService.remove(+id);
  }
}
