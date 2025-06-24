import { Module } from '@nestjs/common';
import { StockChemicalItemService } from './stock_chemical_item.service';
import { StockChemicalItemController } from './stock_chemical_item.controller';

@Module({
  controllers: [StockChemicalItemController],
  providers: [StockChemicalItemService],
})
export class StockChemicalItemModule {}
