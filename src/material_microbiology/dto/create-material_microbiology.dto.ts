import { IsInt, IsOptional } from 'class-validator';

export class CreateMaterialMicrobiologyDto {
  @IsInt()
  material_id: number;

  @IsInt()
  microbiology_parameter_id: number;

  @IsOptional()
  @IsInt()
  created_by?: number;
}
