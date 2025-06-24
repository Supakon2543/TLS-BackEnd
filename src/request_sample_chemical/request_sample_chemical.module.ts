import { Module } from '@nestjs/common';
import { RequestSampleChemicalService } from './request_sample_chemical.service';
import { RequestSampleChemicalController } from './request_sample_chemical.controller';

@Module({
  controllers: [RequestSampleChemicalController],
  providers: [RequestSampleChemicalService],
})
export class RequestSampleChemicalModule {}
