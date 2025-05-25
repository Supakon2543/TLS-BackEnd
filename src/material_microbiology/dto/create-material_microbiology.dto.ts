import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMaterialMicrobiologyDto {
  @IsInt()
  id: number;
  
  @IsInt()
  material_id: number;

  @IsInt()
  microbiology_parameter_id: number;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;

  @IsOptional()
  @IsString()
  created_on?: string;

  @IsOptional()
  @IsString()
  updated_on?: string;
}
