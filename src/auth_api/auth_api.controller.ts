import { Body, Controller, Post } from '@nestjs/common';
import { AuthApiService } from './auth_api.service';
import { CreateAuthApiDto } from './dto/create_auth_api.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth_api')
export class AuthApiController {
  constructor(private readonly authService: AuthApiService) {}

  @ApiOperation({ summary: 'Get AccessToken' })
  @Post('login')
  async login(@Body() user: CreateAuthApiDto) {
    // Validate user here (e.g., check password)
    return this.authService.login(user);
  }
}
