import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('image')
export class ImageController {
  @Get('logo.png')
  getLogo(@Res() res: Response) {
    const filePath = join(process.cwd(), 'prisma', 'image', 'logo.png');
    res.setHeader('Content-Type', 'image/png');
    createReadStream(filePath).pipe(res);
  }
}