import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Length,
} from 'class-validator';

export class CreateManufacturerDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsBoolean()
  is_chemical_stock: boolean;

  @IsBoolean()
  is_equipment_stock: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
