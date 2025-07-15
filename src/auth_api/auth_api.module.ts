import { Module } from '@nestjs/common';
import { AuthApiService } from './auth_api.service';
import { AuthApiController } from './auth_api.controller';
import { UsersService } from 'src/users/users.service';
import { UserRoleService } from 'src/user_role/user_role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserData } from 'src/user_data/user_data.service';

@Module({
  providers: [AuthApiService, UsersService, UserRoleService /*, PrismaService*/, UserData],
  controllers: [AuthApiController],
  exports: [AuthApiService],
})
export class AuthApiModule {}