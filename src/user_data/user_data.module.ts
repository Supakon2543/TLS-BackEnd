import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserData } from './user_data.service';
import { UsersService } from '../users/users.service';
import { UserRoleService } from '../user_role/user_role.service';

@Module({
  providers: [UserData /*, PrismaService*/, UsersService, UserRoleService],
})
export class UserDataModule {}
