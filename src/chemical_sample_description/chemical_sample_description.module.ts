import { Module } from '@nestjs/common';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';
import { ChemicalSampleDescriptionController } from './chemical_sample_description.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChemicalSampleDescriptionController],
  providers: [ChemicalSampleDescriptionService,PrismaService],
})
export class ChemicalSampleDescriptionModule {}
