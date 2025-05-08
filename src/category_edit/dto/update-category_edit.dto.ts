import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryEditDto } from './create-category_edit.dto';

export class UpdateCategoryEditDto extends PartialType(CreateCategoryEditDto) {}
