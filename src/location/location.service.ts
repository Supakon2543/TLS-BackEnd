import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateLocationDto) {
    return this.prisma.location.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }
  
  async create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  async getLocations(params: { id?: number; keyword?: string; status?: number }) {
    const { id, keyword, status } = params;

    return this.prisma.location.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { name: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) throw new NotFoundException(`Location ID ${id} not found`);
    return location;
  }

  async update(id: number, data: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.location.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location.delete({ where: { id } });
  }
}
