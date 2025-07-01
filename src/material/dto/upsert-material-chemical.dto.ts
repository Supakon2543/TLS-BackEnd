import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class UpsertMaterialChemicalDto {
  @IsString()
  id: string;

  @IsInt()
  material_id: number;

  @IsInt()
  chemical_parameter_id: number;

  @IsString()
  @IsOptional()
  chemical_parameter_name: string;

  @IsDateString()
  created_on: string;

  @IsInt()
  created_by: number;
}