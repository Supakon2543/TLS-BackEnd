import { Module } from '@nestjs/common';
import { AuthApiService } from './auth_api.service';
import { AuthApiController } from './auth_api.controller';
import { UsersService } from 'src/users/users.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthApiService, UsersService, UserRoleService, PrismaService],
  controllers: [AuthApiController],
  exports: [AuthApiService],
})
export class AuthModule {}