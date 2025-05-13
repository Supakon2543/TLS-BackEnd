import { Module } from '@nestjs/common';
import { CategoryChemicalService } from './category_chemical.service';
import { CategoryChemicalController } from './category_chemical.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoryChemicalController],
  providers: [CategoryChemicalService, PrismaService],
})
export class CategoryChemicalModule {}
