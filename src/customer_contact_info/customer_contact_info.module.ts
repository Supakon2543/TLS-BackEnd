import { Module } from '@nestjs/common';
import { CustomerContactInfoService } from './customer_contact_info.service';
import { CustomerContactInfoController } from './customer_contact_info.controller';

@Module({
  controllers: [CustomerContactInfoController],
  providers: [CustomerContactInfoService],
})
export class CustomerContactInfoModule {}
