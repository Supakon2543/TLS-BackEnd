// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  employee_id?: string;

  @IsString()
  username: string;

  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  tel?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  dept_code?: string;

  @IsOptional()
  @IsString()
  dept_name?: string;

  @IsOptional()
  @IsString()
  user_location_id?: string;

  @IsOptional()
  @IsString()
  supervisor_code?: string;
}
