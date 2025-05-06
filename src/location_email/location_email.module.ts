import { Module } from '@nestjs/common';
import { LocationEmailService } from './location_email.service';
import { LocationEmailController } from './location_email.controller';

@Module({
  controllers: [LocationEmailController],
  providers: [LocationEmailService],
})
export class LocationEmailModule {}
