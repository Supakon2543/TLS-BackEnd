import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMaterialChemicalDto {
  @IsString()
  id: number;
  
  @IsInt()
  material_id: string;

  @IsInt()
  chemical_parameter_id: number;

  @IsOptional()
  created_by?: number;

  @IsOptional()
  updated_by?: number;

  @IsOptional()
  created_on?: string;

  @IsOptional()
  updated_on?: string;
}