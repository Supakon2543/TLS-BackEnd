import { IsInt, IsString, IsDateString } from 'class-validator';

export class UpsertMaterialChemicalDto {
  @IsInt()
  id: number;

  @IsInt()
  material_id: number;

  @IsInt()
  chemical_parameter_id: number;

  @IsString()
  chemical_parameter_name: string;

  @IsDateString()
  created_on: string;

  @IsInt()
  created_by: number;
}