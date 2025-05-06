// src/users/dto/create-user.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
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
