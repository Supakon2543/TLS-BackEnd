import { Module } from '@nestjs/common';
import { MaterialMicrobiologyService } from './material_microbiology.service';
import { MaterialMicrobiologyController } from './material_microbiology.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MaterialMicrobiologyController],
  providers: [MaterialMicrobiologyService, PrismaService],
})
export class MaterialMicrobiologyModule {}
