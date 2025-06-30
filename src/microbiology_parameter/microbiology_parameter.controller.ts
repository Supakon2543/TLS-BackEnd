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
import { MicrobiologyParameterService } from './microbiology_parameter.service';
import { CreateMicrobiologyParameterDto } from './dto/create-microbiology_parameter.dto';
import { UpdateMicrobiologyParameterDto } from './dto/update-microbiology_parameter.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('microbiology-parameter')
export class MicrobiologyParameterController {
  constructor(
    private readonly microbiologyParameterService: MicrobiologyParameterService,
  ) {}

  // @Post('create')
  // create(
  //   @Body() createMicrobiologyParameterDto: CreateMicrobiologyParameterDto,
  // ) {
  //   return this.microbiologyParameterService.create(
  //     createMicrobiologyParameterDto,
  //   );
  // }

  @Post()
  createOrUpdate(
    @Body() createMicrobiologyParameterDto: CreateMicrobiologyParameterDto,
  ) {
    return this.microbiologyParameterService.createOrUpdate(
      createMicrobiologyParameterDto,
    );
  }

  @Get()
  getMicrobiologyParameters(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.microbiologyParameterService.getMicrobiologyParameters(params);
  }

  @Get('map')
  getMicrobiologyParametersWithSampleDescriptions(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.microbiologyParameterService.getMicrobiologyParametersWithSampleDescriptions(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microbiologyParameterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMicrobiologyParameterDto: UpdateMicrobiologyParameterDto,
  ) {
    return this.microbiologyParameterService.update(
      +id,
      updateMicrobiologyParameterDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microbiologyParameterService.remove(+id);
  }
}
