import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
const secret = process.env.JWTSECRET || '515b400cc9024b3a97fc25aceebb71e3';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: secret, // Use env variable in production!
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}