import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserLocationService } from './user_location.service';
import { CreateUserLocationDto } from './dto/create-user_location.dto';
import { UpdateUserLocationDto } from './dto/update-user_location.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('user-location')
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

    @Post('create')
    create(@Body() payload: CreateUserLocationDto) {
      return this.userLocationService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateUserLocationDto/*, @Response() res: Response*/) {
      return this.userLocationService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.userLocationService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.userLocationService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userLocationService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateUserLocationDto) {
      return this.userLocationService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userLocationService.remove(id);
    }
}
