import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockRetainService } from './stock_retain.service';
import { CreateStockRetainDto } from './dto/create-stock_retain.dto';
import { UpdateStockRetainDto } from './dto/update-stock_retain.dto';

@Controller('stock-retain')
export class StockRetainController {
  constructor(private readonly stockRetainService: StockRetainService) {}

  @Post()
  create(@Body() createStockRetainDto: CreateStockRetainDto) {
    return this.stockRetainService.create(createStockRetainDto);
  }

  @Get()
  findAll() {
    return this.stockRetainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockRetainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockRetainDto: UpdateStockRetainDto) {
    return this.stockRetainService.update(+id, updateStockRetainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockRetainService.remove(+id);
  }
}
