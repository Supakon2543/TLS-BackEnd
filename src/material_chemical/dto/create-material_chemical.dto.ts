import { IsInt, IsOptional } from 'class-validator';

export class CreateMaterialChemicalDto {
  @IsInt()
  id: number;
  
  @IsInt()
  material_id: number;

  @IsInt()
  chemical_parameter_id: number;

  @IsOptional()
  created_by?: number;
}