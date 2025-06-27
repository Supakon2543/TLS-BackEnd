import { Controller, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { DownloadS3Service } from './download_s3.service';
import { CreateDowloadS3Dto } from './dto/create-dowload_s3.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('download-s3')
export class DownloadS3Controller {
  constructor(private readonly downloadS3Service: DownloadS3Service) {}

  @Post()
  async download(@Body() createDowloadS3Dto: CreateDowloadS3Dto, @Res() res: Response) {
    try {
      const fileBuffer = await this.downloadS3Service.downloadFile(createDowloadS3Dto);
      // Optionally set content-type and content-disposition headers
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${createDowloadS3Dto.path?.split('/').pop() || 'file'}"`,
      });
      res.status(HttpStatus.OK).send(fileBuffer);
    } catch (err) {
      res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }
}