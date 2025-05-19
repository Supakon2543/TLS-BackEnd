import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';

@Injectable()
export class LocationEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateLocationEmailDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.location_email.create({ data });
    }
  return this.prisma.location_email.upsert({
    where: { id: data.id },
    create: { ...data }, // Create a new record with the provided data
    update: data, // Update the existing record with the provided data
  });
}

  async create(data: CreateLocationEmailDto) {
    return this.prisma.location_email.create({ data });
  }

  async findAll() {
    return this.prisma.location_email.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.location_email.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`LocationEmail ID ${id} not found`);
    return record;
  }

  async update(id: number, data: UpdateLocationEmailDto) {
    await this.findOne(id);
    return this.prisma.location_email.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location_email.delete({ where: { id } });
  }
}

