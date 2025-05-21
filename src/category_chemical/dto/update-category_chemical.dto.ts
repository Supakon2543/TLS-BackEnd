import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryChemicalDto } from './create-category_chemical.dto';

export class UpdateCategoryChemicalDto extends PartialType(CreateCategoryChemicalDto) {}
