import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { PrismaService } from 'src/prisma/prisma.service';
const secret = process.env.JWTSECRET || '515b400cc9024b3a97fc25aceebb71e3';
console.log('Secret Value:', secret);
console.log('JWT Secret From .ENV:', process.env.JWTSECRET); // Log the secret for debugging purposes
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '515b400cc9024b3a97fc25aceebb71e3', // Use env variable in production!
      signOptions: { expiresIn: '3h' },
    }),
  ],
<<<<<<< HEAD
  providers: [AuthService, JwtStrategy, UsersService, UserRoleService, PrismaService, JwtService],
=======
  providers: [AuthService, JwtStrategy, UsersService, UserRoleService, PrismaService],
>>>>>>> 604a125c958e15b87c14dd7e775088090791d193
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}