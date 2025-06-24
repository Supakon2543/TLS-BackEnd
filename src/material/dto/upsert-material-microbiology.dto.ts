import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class UpsertMaterialMicrobiologyDto {
  @IsInt()
  id: number;

  @IsInt()
  material_id: number;

  @IsInt()
  microbiology_parameter_id: number;

  @IsString()
  @IsOptional()
  microbiology_parameter_name: string;

  @IsDateString()
  created_on: string;

  @IsInt()
  created_by: number;
}