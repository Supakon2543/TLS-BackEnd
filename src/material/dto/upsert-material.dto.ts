import { IsInt, IsString, IsBoolean, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpsertMaterialChemicalDto } from './upsert-material-chemical.dto';
import { UpsertMaterialMicrobiologyDto } from './upsert-material-microbiology.dto';

export class UpsertMaterialDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  test_report_name: string;

  @IsOptional()
  @IsBoolean()
  conclusion: boolean;

  @IsOptional()
  @IsString()
  @IsOptional()
  reg_no: string;

  @IsOptional()
  @IsBoolean()
  @IsOptional()
  is_special_parameter: boolean;

  @IsOptional()
  @IsString()
  @IsOptional()
  special_parameter_name: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  special_parameter_type: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  remark_report: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  created_on: string;

  @IsInt()
  @IsOptional()
  created_by: number;

  @IsString()
  @IsOptional()
  updated_on: string;

  @IsInt()
  @IsOptional()
  updated_by: number;

  @ValidateNested({ each: true })
  @Type(() => UpsertMaterialChemicalDto)
  material_chemical: UpsertMaterialChemicalDto[];

  @ValidateNested({ each: true })
  @Type(() => UpsertMaterialMicrobiologyDto)
  material_microbiology: UpsertMaterialMicrobiologyDto[];
}