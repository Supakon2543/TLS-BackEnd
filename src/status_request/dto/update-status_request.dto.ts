import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusRequestDto } from './create-status_request.dto';

export class UpdateStatusRequestDto extends PartialType(CreateStatusRequestDto) {}
