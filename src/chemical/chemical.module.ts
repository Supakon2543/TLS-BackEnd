import { Module } from '@nestjs/common';
import { ChemicalService } from './chemical.service';
import { ChemicalController } from './chemical.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsUniqueConstraint } from 'src/is-unique.validator';

@Module({
  controllers: [ChemicalController],
  providers: [ChemicalService /*, PrismaService*/, IsUniqueConstraint],
})
export class ChemicalModule {}

