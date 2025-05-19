import { PartialType } from '@nestjs/mapped-types';
import { CreateLabProcessDto } from './create-lab_process.dto';

export class UpdateLabProcessDto extends PartialType(CreateLabProcessDto) {}
