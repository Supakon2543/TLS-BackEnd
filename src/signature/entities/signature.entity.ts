import { ApiProperty } from '@nestjs/swagger';

export class Signature {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 'signature.png' })
  filename: string;

  @ApiProperty({ example: '/uploads/signatures/signature.png' })
  path: string;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  created_on?: Date;

  @ApiProperty({ example: 1, required: false })
  created_by?: number;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  updated_on?: Date;

  @ApiProperty({ example: 1, required: false })
  updated_by?: number;
}