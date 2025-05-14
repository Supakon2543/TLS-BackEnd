import { Module } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoxController],
  providers: [BoxService,PrismaService],
})
export class BoxModule {}
