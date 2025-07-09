import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUnitDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsBoolean()
  is_sample: boolean;

  @IsBoolean()
  is_chemical: boolean;

  @IsBoolean()
  is_microbiology: boolean;

  @IsBoolean()
  is_chemical_stock: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  created_on?: string;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsString()
  updated_on?: string;
  
  @IsOptional()
  @IsInt()
  updated_by?: number;
  
}
