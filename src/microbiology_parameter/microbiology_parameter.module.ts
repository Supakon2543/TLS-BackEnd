import { Module } from '@nestjs/common';
import { MicrobiologyParameterService } from './microbiology_parameter.service';
import { MicrobiologyParameterController } from './microbiology_parameter.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MicrobiologyParameterController],
  providers: [MicrobiologyParameterService, PrismaService],
})
export class MicrobiologyParameterModule {}
