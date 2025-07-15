import { Module } from '@nestjs/common';
import { StockRetainService } from './stock_retain.service';
import { StockRetainController } from './stock_retain.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StockRetainController],
  providers: [StockRetainService /*, PrismaService*/],
})
export class StockRetainModule {}
