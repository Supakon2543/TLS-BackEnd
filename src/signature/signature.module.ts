import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SignatureController],
  providers: [SignatureService /*, PrismaService*/],
})
export class SignatureModule {}
