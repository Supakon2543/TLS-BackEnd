import { PartialType } from '@nestjs/mapped-types';
import { CreateAccreditedDto } from './create-accredited.dto';

export class UpdateAccreditedDto extends PartialType(CreateAccreditedDto) {}
