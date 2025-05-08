import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialMicrobiologyDto } from './create-material_microbiology.dto';

export class UpdateMaterialMicrobiologyDto extends PartialType(CreateMaterialMicrobiologyDto) {}
