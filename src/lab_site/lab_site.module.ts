import { Module } from '@nestjs/common';
import { LabSiteService } from './lab_site.service';
import { LabSiteController } from './lab_site.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LabSiteController],
  providers: [LabSiteService /*, PrismaService*/],
})
export class LabSiteModule {}
