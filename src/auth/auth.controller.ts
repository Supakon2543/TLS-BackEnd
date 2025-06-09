import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create_auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get AccessToken' })
  @Post('login')
  async login(@Body() user: CreateAuthDto) {
    // Validate user here (e.g., check password)
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Get RefreshToken' })
  @Post('refresh')
  async refresh(@Body() user: CreateAuthDto) {
    // Validate user here (e.g., check password)
    return "process.env.JWTSECRET : " + process.env.JWTSECRET
  }
}
