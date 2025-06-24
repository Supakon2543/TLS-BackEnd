import { Module } from '@nestjs/common';
import { StockRetainService } from './stock_retain.service';
import { StockRetainController } from './stock_retain.controller';

@Module({
  controllers: [StockRetainController],
  providers: [StockRetainService],
})
export class StockRetainModule {}
