import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateSpecTypeDto } from './dto/create-spec_type.dto';
import { UpdateSpecTypeDto } from './dto/update-spec_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpecTypeService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateSpecTypeDto/*, @Response() res: Response*/) {
      return await this.prisma.spec_type.create({
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
      return this.prisma.spec_type.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const spec_type = await this.prisma.spec_type.findUnique({
        where: { id },
      });
  
      if (!spec_type) {
        throw new NotFoundException(`Spec Type with ID ${id} not found`);
      }
  
      return spec_type;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateSpecTypeDto/*, @Response() res: Response*/) {
  
      const existingSpecType = await this.prisma.spec_type.findUnique({ where: { id } });
  
      if (!existingSpecType) {
        throw new NotFoundException(`Spec Type with ID ${id} not found`);
      }
  
      return await this.prisma.spec_type.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const spec_type = await this.prisma.spec_type.findUnique({
        where: { id },
      });
  
      if (!spec_type) {
        throw new NotFoundException(`Spec Type with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.spec_type.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateSpecTypeDto/*, @Response() res: Response*/) {
      const id = payload.id
      const spec_type = await this.prisma.spec_type.findUnique({
        where: { id },
      });
  
      if (!spec_type) {
        return await this.prisma.spec_type.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.spec_type.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.spec_type.findMany({
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
          return await this.prisma.spec_type.findMany({
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
          return await this.prisma.spec_type.findMany({
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
        return await this.prisma.spec_type.findMany({
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
