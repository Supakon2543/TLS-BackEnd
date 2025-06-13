import { IsInt, IsString, IsBoolean, IsDateString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UpsertMaterialChemicalDto } from './upsert-material-chemical.dto';
import { UpsertMaterialMicrobiologyDto } from './upsert-material-microbiology.dto';

export class UpsertMaterialDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  test_report_name: string;

  @IsBoolean()
  @IsOptional()
  conclusion: boolean;

  @IsString()
  @IsOptional()
  reg_no: string;

  @IsBoolean()
  @IsOptional()
  is_special_parameter: boolean;

  @IsString()
  @IsOptional()
  special_parameter_name: string;

  @IsString()
  @IsOptional()
  special_parameter_type: string;

  @IsString()
  @IsOptional()
  remark_report: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsDateString()
  @IsOptional()
  created_on: string;

  @IsInt()
  @IsOptional()
  created_by: number;

  @IsDateString()
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