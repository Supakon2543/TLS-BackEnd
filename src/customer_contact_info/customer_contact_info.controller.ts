import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomerContactInfoService } from './customer_contact_info.service';
import { CreateCustomerContactInfoDto } from './dto/create-customer_contact_info.dto';
import { UpdateCustomerContactInfoDto } from './dto/update-customer_contact_info.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('customer_contact_info')
export class CustomerContactInfoController {
  constructor(private readonly customerContactInfoService: CustomerContactInfoService) {}

  @Post()
  create(@Body() createCustomerContactInfoDto: CreateCustomerContactInfoDto) {
    return this.customerContactInfoService.createOrUpdate(createCustomerContactInfoDto);
  }

  @Get()
  getCustomerContactInfos(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.customerContactInfoService.getCustomerContactInfos(params);
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