import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  createOrUpdate(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.createOrUpdate(createUserRoleDto);
  }

  @Get()
  getuser_role(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.userRoleService.getuser_role(params);
  }

  @Post('create')
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userRoleService.remove(+id);
  }
}
