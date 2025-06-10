import { Module } from '@nestjs/common';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';
import { MicrobiologySampleDescriptionController } from './microbiology_sample_description.controller';

@Module({
  controllers: [MicrobiologySampleDescriptionController],
  providers: [MicrobiologySampleDescriptionService],
})
export class MicrobiologySampleDescriptionModule {}
