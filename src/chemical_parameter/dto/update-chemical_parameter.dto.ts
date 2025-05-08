import { PartialType } from '@nestjs/mapped-types';
import { CreateChemicalParameterDto } from './create-chemical_parameter.dto';

export class UpdateChemicalParameterDto extends PartialType(CreateChemicalParameterDto) {}
