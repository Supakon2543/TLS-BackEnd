import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecTypeDto } from './create-spec_type.dto';

export class UpdateSpecTypeDto extends PartialType(CreateSpecTypeDto) {}
