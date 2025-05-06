import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationEmailDto } from './create-location_email.dto';

export class UpdateLocationEmailDto extends PartialType(CreateLocationEmailDto) {}
