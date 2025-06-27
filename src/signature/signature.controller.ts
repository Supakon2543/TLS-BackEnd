import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';
import { AuthGuard } from '@nestjs/passport';


// @UseGuards(AuthGuard('jwt'))
@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post()
  create(@Body() createSignatureDto: CreateSignatureDto) {
    return this.signatureService.createOrUpdate(createSignatureDto);
  }

  @Get()
    getObjectives(
      @Query() params: { id?: number; keyword?: string; status?: number },
    ) {
      return this.signatureService.getSignatures(params);
    }

  @Get('map')
  getSignatureMap(
    @Query() params: { id?: number; keyword?: string; role_id?: string }
  ) {
    return this.signatureService.getSignatureMap(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignatureDto: UpdateSignatureDto) {
    return this.signatureService.update(+id, updateSignatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureService.remove(+id);
  }
}