import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { PresignService } from './presign.service';
import { Response } from 'express';

@Controller('presign')
export class PresignController {
  constructor(private readonly presignService: PresignService) {}

  @Post()
  async generatePresignUrls(@Body() body: { path: string; files: { name: string; type: string }[] }) {
    return this.presignService.generatePresignUrls(body);
  }

  @Get('download')
  async download(
    @Query('bucket') bucket: string,
    @Query('key') key: string,
    @Res() res: Response,
  ) {
    const fileBuffer = await this.presignService.downloadFile(bucket, key);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${key.split('/').pop()}"`,
    });
    res.send(fileBuffer);
  }

  
}