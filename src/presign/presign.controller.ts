import { Controller, Post, Body } from '@nestjs/common';
import { PresignService } from './presign.service';

@Controller('presign')
export class PresignController {
  constructor(private readonly presignService: PresignService) {}

  @Post()
  async generatePresignUrls(@Body() body: { path: string; files: { name: string; type: string }[] }) {
    return this.presignService.generatePresignUrls(body);
  }
}