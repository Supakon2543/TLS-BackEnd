import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockChemicalService } from './stock_chemical.service';
import { CreateStockChemicalDto } from './dto/create-stock_chemical.dto';
import { UpdateStockChemicalDto } from './dto/update-stock_chemical.dto';

@Controller('stock-chemical')
export class StockChemicalController {
  constructor(private readonly stockChemicalService: StockChemicalService) {}

  @Post()
  create(@Body() createStockChemicalDto: CreateStockChemicalDto) {
    return this.stockChemicalService.create(createStockChemicalDto);
  }

  @Get()
  findAll() {
    return this.stockChemicalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockChemicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockChemicalDto: UpdateStockChemicalDto) {
    return this.stockChemicalService.update(+id, updateStockChemicalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockChemicalService.remove(+id);
  }
}
