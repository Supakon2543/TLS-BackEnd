import { Injectable } from '@nestjs/common';
import { CreateCustomerContactInfoDto } from './dto/create-customer_contact_info.dto';
import { UpdateCustomerContactInfoDto } from './dto/update-customer_contact_info.dto';

@Injectable()
export class CustomerContactInfoService {
  create(createCustomerContactInfoDto: CreateCustomerContactInfoDto) {
    return 'This action adds a new customerContactInfo';
  }

  findAll() {
    return `This action returns all customerContactInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerContactInfo`;
  }

  update(id: number, updateCustomerContactInfoDto: UpdateCustomerContactInfoDto) {
    return `This action updates a #${id} customerContactInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerContactInfo`;
  }
}
