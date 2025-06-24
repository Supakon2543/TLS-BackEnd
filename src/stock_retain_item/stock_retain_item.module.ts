import { Module } from '@nestjs/common';
import { StockRetainItemService } from './stock_retain_item.service';
import { StockRetainItemController } from './stock_retain_item.controller';

@Module({
  controllers: [StockRetainItemController],
  providers: [StockRetainItemService],
})
export class StockRetainItemModule {}
