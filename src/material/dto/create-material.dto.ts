<<<<<<< HEAD
import { IsBoolean, IsInt, IsOptional, IsString, Length } from "class-validator";
=======
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
>>>>>>> e356be980c4560fd9871649495c43b27d98f5ea7

export class CreateMaterialDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 100)
  test_report_name: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
