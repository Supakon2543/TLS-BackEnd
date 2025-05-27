import { IsInt, IsString, IsBoolean, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpsertMaterialChemicalDto } from './upsert-material-chemical.dto';
import { UpsertMaterialMicrobiologyDto } from './upsert-material-microbiology.dto';

export class UpsertMaterialDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

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