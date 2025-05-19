import { Injectable } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from '@nestjs/common';
import * as v8 from 'v8';



@Injectable()
export class ChemicalService {
  constructor(private readonly prisma: PrismaService) {}


  createOrUpdate(data: CreateChemicalDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.chemical.create({ data });
    }

    return this.prisma.chemical.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async getChemicals(params: {
    id?: number;
    keyword?: string;
    status?: number;
  }) {
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
