import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';

@Injectable()
export class LocationEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLocationEmailDto) {
    return this.prisma.location_email.create({ data });
  }

  async findAll() {
    return this.prisma.location_email.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.location_email.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`LocationEmail ID ${id} not found`);
    return record;
  }

  async update(id: string, data: UpdateLocationEmailDto) {
    await this.findOne(id);
    return this.prisma.location_email.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.location_email.delete({ where: { id } });
  }
}
