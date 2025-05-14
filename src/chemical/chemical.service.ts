import { Injectable } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChemicalService {
  constructor(private readonly prisma: PrismaService) {}

  createOrUpdate(data: CreateChemicalDto) {
    return this.prisma.chemical.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async getChemicals(params: { id?: number; keyword?: string; status?: number }) {
    const { id, keyword, status } = params;

    return this.prisma.chemical.findMany({
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

  create(data: CreateChemicalDto) {
    return this.prisma.chemical.create({ data });
  }

  findAll() {
    return this.prisma.chemical.findMany();
  }

  findOne(id: number) {
    return this.prisma.chemical.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateChemicalDto) {
    return this.prisma.chemical.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.chemical.delete({ where: { id } });
  }

}
