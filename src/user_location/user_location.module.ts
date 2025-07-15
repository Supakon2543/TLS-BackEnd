import { Module } from '@nestjs/common';
import { UserLocationService } from './user_location.service';
import { UserLocationController } from './user_location.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserLocationController],
  providers: [UserLocationService /*, PrismaService*/],
})
export class UserLocationModule {}
