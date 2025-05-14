import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateUserRoleDto {

  @IsInt()
  id: number;
  
  @IsInt()
  userId: number;

  @IsString()
  role_id: string;
}
