import { Module } from '@nestjs/common';
import { CustomerContactInfoService } from './customer_contact_info.service';
import { CustomerContactInfoController } from './customer_contact_info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CustomerContactInfoController],
  providers: [CustomerContactInfoService,PrismaService],
})
export class CustomerContactInfoModule {}
