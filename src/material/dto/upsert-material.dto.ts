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

  @IsOptional()
  @IsString()
  conclusion: string;

  @IsOptional()
  @IsString()
  reg_no: string;

  @IsOptional()
  @IsBoolean()
  is_special_parameter: boolean;

  @IsOptional()
  @IsString()
  special_parameter_name: string;

  @IsOptional()
  @IsString()
  special_parameter_type: string;

  @IsOptional()
  @IsString()
  remark_report: string;

  @IsBoolean()
  status: boolean;

  @IsDateString()
  created_on: string;

  @IsInt()
  created_by: number;

  @IsDateString()
  updated_on: string;

  @IsInt()
  updated_by: number;

  @ValidateNested({ each: true })
  @Type(() => UpsertMaterialChemicalDto)
  material_chemical: UpsertMaterialChemicalDto[];

  @ValidateNested({ each: true })
  @Type(() => UpsertMaterialMicrobiologyDto)
  material_microbiology: UpsertMaterialMicrobiologyDto[];
}