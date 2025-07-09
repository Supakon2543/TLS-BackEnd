import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserData } from './user_data.service';
import { UsersService } from 'src/users/users.service';
import { UserRoleService } from 'src/user_role/user_role.service';

@Module({
  providers: [UserData, PrismaService, UsersService, UserRoleService],
})
export class UserDataModule {}
