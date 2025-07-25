import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class UpsertMaterialChemicalDto {
  @IsInt()
  id: number;

  @IsString()
  material_id: string;

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