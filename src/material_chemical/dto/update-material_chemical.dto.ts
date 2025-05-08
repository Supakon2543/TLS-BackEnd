import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialChemicalDto } from './create-material_chemical.dto';

export class UpdateMaterialChemicalDto extends PartialType(CreateMaterialChemicalDto) {}
