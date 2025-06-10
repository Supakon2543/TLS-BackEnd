import { Module } from '@nestjs/common';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';
import { ChemicalSampleDescriptionController } from './chemical_sample_description.controller';

@Module({
  controllers: [ChemicalSampleDescriptionController],
  providers: [ChemicalSampleDescriptionService],
})
export class ChemicalSampleDescriptionModule {}
