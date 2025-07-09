import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthApiService } from './auth_api.service';
import { CreateAuthApiDto } from './dto/create_auth_api.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth-api')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @ApiOperation({ summary: 'Get AccessToken' })
  @Post('login')
  async login(@Body() user: CreateAuthApiDto, @Res() res: Response) {
    const result = await this.authApiService.login(user);
    return res.status(200).json(result);
  }
}
