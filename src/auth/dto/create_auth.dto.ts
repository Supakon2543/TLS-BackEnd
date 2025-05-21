import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
  } from 'class-validator';
  
  export class CreateAuthDto {
    @ApiProperty({ example: 'Supakon' })
    @IsString()
    username: number;
  }