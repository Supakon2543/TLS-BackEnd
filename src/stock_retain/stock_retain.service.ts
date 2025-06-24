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
    const stockRetain = await this.prisma.stock_retain.findUnique({
      where: { id },
    });
    if (!stockRetain)
      throw new NotFoundException(`StockRetain ID ${id} not found`);
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
}