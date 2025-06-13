// src/users/dto/create-user.dto.ts
import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
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
  @IsInt()
  supervisor_id?: number;

  @IsOptional()
  @IsString()
<<<<<<< HEAD
  supervisor_id?: number;

  @IsOptional()
  @IsString()
=======
>>>>>>> 604a125c958e15b87c14dd7e775088090791d193
  position_name?: string;
}
