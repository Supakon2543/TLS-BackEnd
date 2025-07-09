import { PartialType } from '@nestjs/swagger';
import { CreateCustomerContactInfoDto } from './create-customer_contact_info.dto';

export class UpdateCustomerContactInfoDto extends PartialType(CreateCustomerContactInfoDto) {}
