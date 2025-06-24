import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockRetainItemService } from './stock_retain_item.service';
import { CreateStockRetainItemDto } from './dto/create-stock_retain_item.dto';
import { UpdateStockRetainItemDto } from './dto/update-stock_retain_item.dto';

@Controller('stock-retain-item')
export class StockRetainItemController {
  constructor(private readonly stockRetainItemService: StockRetainItemService) {}

  @Post()
  create(@Body() createStockRetainItemDto: CreateStockRetainItemDto) {
    return this.stockRetainItemService.create(createStockRetainItemDto);
  }

  @Get()
  findAll() {
    return this.stockRetainItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockRetainItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockRetainItemDto: UpdateStockRetainItemDto) {
    return this.stockRetainItemService.update(+id, updateStockRetainItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockRetainItemService.remove(+id);
  }
}
