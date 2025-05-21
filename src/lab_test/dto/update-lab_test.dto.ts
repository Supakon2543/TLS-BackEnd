import { PartialType } from '@nestjs/mapped-types';
import { CreateLabTestDto } from './create-lab_test.dto';

export class UpdateLabTestDto extends PartialType(CreateLabTestDto) {}
