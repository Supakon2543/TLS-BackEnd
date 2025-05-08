import { Injectable } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChemicalService {
  constructor(private readonly prisma: PrismaService) {}

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
