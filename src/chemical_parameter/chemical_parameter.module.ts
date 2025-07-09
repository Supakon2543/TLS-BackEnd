import { Module } from '@nestjs/common';
import { ChemicalParameterService } from './chemical_parameter.service';
import { ChemicalParameterController } from './chemical_parameter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChemicalParameterController],
  providers: [ChemicalParameterService, PrismaService],
})
export class ChemicalParameterModule {}
