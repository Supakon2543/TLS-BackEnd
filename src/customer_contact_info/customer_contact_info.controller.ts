import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerContactInfoService } from './customer_contact_info.service';
import { CreateCustomerContactInfoDto } from './dto/create-customer_contact_info.dto';
import { UpdateCustomerContactInfoDto } from './dto/update-customer_contact_info.dto';

@Controller('customer-contact-info')
export class CustomerContactInfoController {
  constructor(private readonly customerContactInfoService: CustomerContactInfoService) {}

  @Post()
  create(@Body() createCustomerContactInfoDto: CreateCustomerContactInfoDto) {
    return this.customerContactInfoService.create(createCustomerContactInfoDto);
  }

  @Get()
  findAll() {
    return this.customerContactInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerContactInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerContactInfoDto: UpdateCustomerContactInfoDto) {
    return this.customerContactInfoService.update(+id, updateCustomerContactInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerContactInfoService.remove(+id);
  }
}
