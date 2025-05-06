import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateUserRoleDto {
  @IsInt()
  userId: number;

  @IsString()
  role_id: string;
}
