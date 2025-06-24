import { Module } from '@nestjs/common';
import { StockChemicalService } from './stock_chemical.service';
import { StockChemicalController } from './stock_chemical.controller';

@Module({
  controllers: [StockChemicalController],
  providers: [StockChemicalService],
})
export class StockChemicalModule {}
