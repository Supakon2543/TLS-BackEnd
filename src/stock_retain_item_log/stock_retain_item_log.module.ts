import { Module } from '@nestjs/common';
import { StockRetainItemLogService } from './stock_retain_item_log.service';
import { StockRetainItemLogController } from './stock_retain_item_log.controller';

@Module({
  controllers: [StockRetainItemLogController],
  providers: [StockRetainItemLogService],
})
export class StockRetainItemLogModule {}
