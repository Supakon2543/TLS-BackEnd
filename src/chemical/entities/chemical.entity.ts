import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsUnique } from 'src/is-unique.validator';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';

export class Chemical {
  @IsInt()
  id: number;

  @IsString()
  @IsUnique('chemical', 'code', { message: 'code must be unique' })
  code: string;

  @IsString()
  name: string;

  @IsInt()
  manufacturer_id: number;

  @IsString()
  category_chemical_id: string;

  @IsString()
  storage_condition: string;

  @IsInt()
  min_stock: number;

  @IsInt()
  unit_id: number;

  @IsOptional()
  @IsEmail()
  email_notification?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @CreateDateColumn()
  created_on: Date;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsDate()
  updated_on?: Date;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
