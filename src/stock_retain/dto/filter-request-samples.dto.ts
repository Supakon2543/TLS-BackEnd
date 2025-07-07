import {
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SampleFilterDto {
  @IsOptional()
  @IsString()
  name: string;
}

export class MaterialCodeFilterDto {
  @IsOptional()
  @IsString()
  code: string;
}

export class LocationFilterDto {
  @IsOptional()
  @IsNumber()
  id: number;
}

export class DateRangeFilterDto {
  @IsOptional()
  @IsDateString()
  start?: string;

  @IsOptional()
  @IsDateString()
  end?: string;
}

export class StatusFilterDto {
  @IsOptional()
  @IsString()
  id: string;
}

export class LabFilterDto {
  @IsOptional()
  @IsString()
  id: string;
}

export class FilterRequestSamplesDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleFilterDto)
  sample?: SampleFilterDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaterialCodeFilterDto)
  material_code?: MaterialCodeFilterDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationFilterDto)
  location?: LocationFilterDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeFilterDto)
  received_date?: DateRangeFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeFilterDto)
  mfg_date?: DateRangeFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeFilterDto)
  expiry_date?: DateRangeFilterDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatusFilterDto)
  status?: StatusFilterDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabFilterDto)
  lab?: LabFilterDto[];
}
