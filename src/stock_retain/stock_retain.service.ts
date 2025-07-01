import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockRetainDto } from './dto/create-stock_retain.dto';
import { UpdateStockRetainDto } from './dto/update-stock_retain.dto';

@Injectable()
export class StockRetainService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateStockRetainDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.stock_retain.create({ data: createData });
    }
    return this.prisma.stock_retain.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async create(data: CreateStockRetainDto) {
    return this.prisma.stock_retain.create({ data });
  }

  async findAll() {
    return this.prisma.stock_retain.findMany();
  }

  async findOne(id: number) {
  // Add validation to ensure id is valid
  if (!id || isNaN(id) || id <= 0) {
    throw new NotFoundException(`Invalid StockRetain ID: ${id}`);
  }

  const stockRetain = await this.prisma.stock_retain.findUnique({
    where: { 
      id: id 
    },
  });
  
  if (!stockRetain) {
    throw new NotFoundException(`StockRetain ID ${id} not found`);
  }
  
  return stockRetain;
}

  async update(id: number, data: UpdateStockRetainDto) {
    await this.findOne(id);
    return this.prisma.stock_retain.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stock_retain.delete({ where: { id } });
  }

  // List methods for related entities
  async listSamples() {
    return this.prisma.request_sample.findMany({
      select: {
        id: true,
        sample_code: true,
        sample_name: true,
      },
      orderBy: { sample_code: 'asc' },
    });
  }

  async listMaterials() {
    return this.prisma.material.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listLocations() {
    return this.prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listStatusRetain() {
    return this.prisma.status_retain.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async listLabSites() {
    return this.prisma.lab_site.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listSections() {
    return this.prisma.section.findMany({
      select: {
        id: true,
        location_id: true,
        name: true,
        number_of_box: true,
        status: true,
        location: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async listBoxes() {
    return this.prisma.box.findMany({
      select: {
        id: true,
        location_id: true,
        section_id: true,
        name: true,
        number_of_bottle: true,
        status: true,
        location: {
          select: {
            name: true,
          },
        },
        section: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getDropdownData() {
    const [samples, materials, locations, statusRetain, labSites] = await Promise.all([
      this.listSamples(),
      this.listMaterials(),
      this.listLocations(),
      this.listStatusRetain(),
      this.listLabSites(),
    ]);

    return {
      samples,
      materials,
      locations,
      statusRetain,
      labSites,
    };
  }
}