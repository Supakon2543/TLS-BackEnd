import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

    @Post('create')
    create(@Body() payload: CreateRoleDto) {
      return this.roleService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateRoleDto/*, @Response() res: Response*/) {
      return this.roleService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.roleService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.roleService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.roleService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
      return this.roleService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.roleService.remove(id);
    }
}
