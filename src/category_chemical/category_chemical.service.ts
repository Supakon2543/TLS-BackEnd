import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateCategoryChemicalDto } from './dto/create-category_chemical.dto';
import { UpdateCategoryChemicalDto } from './dto/update-category_chemical.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryChemicalService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateCategoryChemicalDto/*, @Response() res: Response*/) {
      return await this.prisma.category_chemical.create({
        data: payload,
        // select: {
        //   id: true,
        //   order: true,
        //   name: true,
        //   status :true
        // },
      });
  
      
    }
  
    findAll(/*@Request() req: Request, @Response() res: Response*/) {
      return this.prisma.category_chemical.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const category_chemical = await this.prisma.category_chemical.findUnique({
        where: { id },
      });
  
      if (!category_chemical) {
        throw new NotFoundException(`Category Chemical with ID ${id} not found`);
      }
  
      return category_chemical;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateCategoryChemicalDto/*, @Response() res: Response*/) {
  
      const existingCategoryChemical = await this.prisma.category_chemical.findUnique({ where: { id } });
  
      if (!existingCategoryChemical) {
        throw new NotFoundException(`Category Chemical with ID ${id} not found`);
      }
  
      return await this.prisma.category_chemical.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const category_chemical = await this.prisma.category_chemical.findUnique({
        where: { id },
      });
  
      if (!category_chemical) {
        throw new NotFoundException(`Category Chemical with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.category_chemical.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateCategoryChemicalDto/*, @Response() res: Response*/) {
      const id = payload.id
      const category_chemical = await this.prisma.category_chemical.findUnique({
        where: { id },
      });
  
      if (!category_chemical) {
        return await this.prisma.category_chemical.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.category_chemical.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.category_chemical.findMany({
            where: {
              status: true
            },
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          })
        }
        else if (status == 2) {
          return await this.prisma.category_chemical.findMany({
            where: {
              status: false
            },
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          })
        }
        else {
          return await this.prisma.category_chemical.findMany({
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          })
        }
      }
      else {
        return await this.prisma.category_chemical.findMany({
          where: { id },
          orderBy: { 
            order: 'asc'
          },
          select: {
            id: true,
            name: true
          }
        })
      }
    }
}
