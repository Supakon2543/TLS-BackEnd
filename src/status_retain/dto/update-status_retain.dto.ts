import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusRetainDto } from './create-status_retain.dto';

export class UpdateStatusRetainDto extends PartialType(CreateStatusRetainDto) {}
