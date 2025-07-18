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
import { LocationEmailService } from './location_email.service';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';
import { AuthGuard } from '@nestjs/passport';

//test

// @UseGuards(AuthGuard('jwt'))
@Controller('location-email')
export class LocationEmailController {
  constructor(private readonly locationEmailService: LocationEmailService) {}

  @Post()
  createOrUpdate(@Body() createLocationEmailDto: CreateLocationEmailDto) {
    return this.locationEmailService.createOrUpdate(createLocationEmailDto);
  }

  @Get()
  getLocationEmails(
    @Query() params: { id?: string; keyword?: string; status?: number },
  ) {
    return this.locationEmailService.getLocationEmails(params);
  }

  @Post('create')
  create(@Body() createLocationEmailDto: CreateLocationEmailDto) {
    return this.locationEmailService.create(createLocationEmailDto);
  }

  @Get()
  findAll() {
    return this.locationEmailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationEmailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationEmailDto: UpdateLocationEmailDto,
  ) {
    return this.locationEmailService.update(+id, updateLocationEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationEmailService.remove(+id);
  }
}
