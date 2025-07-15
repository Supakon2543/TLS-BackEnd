import { Module } from '@nestjs/common';
import { MaterialChemicalService } from './material_chemical.service';
import { MaterialChemicalController } from './material_chemical.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MaterialChemicalController],
  providers: [MaterialChemicalService /*, PrismaService*/],
})
export class MaterialChemicalModule {}
