import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateAuthApiDto {
    @ApiProperty({type: String, description: 'Username' })
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty({type: String, description: 'Password' })
    @IsString()
    @IsOptional()
    password: string;

    @ApiProperty({type: String, description: 'Token' })
    @IsString()
    @IsOptional()
    token: string;
  }