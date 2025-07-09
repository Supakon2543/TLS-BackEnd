import { IsString, IsInt } from 'class-validator';

export class CreateUserRoleDto {

  @IsInt()
  id: number;
  
  @IsInt()
  user_id: number;

  @IsString()
  role_id: string;
}
