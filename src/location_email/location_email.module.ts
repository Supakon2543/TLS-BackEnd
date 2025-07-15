import { Module } from '@nestjs/common';
import { LocationEmailService } from './location_email.service';
import { LocationEmailController } from './location_email.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LocationEmailController],
  providers: [LocationEmailService /*, PrismaService*/],
})
export class LocationEmailModule {}
