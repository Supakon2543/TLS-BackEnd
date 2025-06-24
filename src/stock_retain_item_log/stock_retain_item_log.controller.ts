import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockRetainItemLogService } from './stock_retain_item_log.service';
import { CreateStockRetainItemLogDto } from './dto/create-stock_retain_item_log.dto';
import { UpdateStockRetainItemLogDto } from './dto/update-stock_retain_item_log.dto';

@Controller('stock-retain-item-log')
export class StockRetainItemLogController {
  constructor(private readonly stockRetainItemLogService: StockRetainItemLogService) {}

  @Post()
  create(@Body() createStockRetainItemLogDto: CreateStockRetainItemLogDto) {
    return this.stockRetainItemLogService.create(createStockRetainItemLogDto);
  }

  @Get()
  findAll() {
    return this.stockRetainItemLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockRetainItemLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockRetainItemLogDto: UpdateStockRetainItemLogDto) {
    return this.stockRetainItemLogService.update(+id, updateStockRetainItemLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockRetainItemLogService.remove(+id);
  }
}
