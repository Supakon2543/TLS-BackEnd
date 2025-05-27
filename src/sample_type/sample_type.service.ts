import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateSampleTypeDto } from './dto/create-sample_type.dto';
import { UpdateSampleTypeDto } from './dto/update-sample_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleTypeService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateSampleTypeDto/*, @Response() res: Response*/) {
      return await this.prisma.sample_type.create({
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
      return this.prisma.sample_type.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const sample_type = await this.prisma.sample_type.findUnique({
        where: { id },
      });
  
      if (!sample_type) {
        throw new NotFoundException(`Sample Type with ID ${id} not found`);
      }
  
      return sample_type;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateSampleTypeDto/*, @Response() res: Response*/) {
  
      const existingSampleType = await this.prisma.sample_type.findUnique({ where: { id } });
  
      if (!existingSampleType) {
        throw new NotFoundException(`Sample Type with ID ${id} not found`);
      }
  
      return await this.prisma.sample_type.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const sample_type = await this.prisma.sample_type.findUnique({
        where: { id },
      });
  
      if (!sample_type) {
        throw new NotFoundException(`Sample Type with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.sample_type.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateSampleTypeDto/*, @Response() res: Response*/) {
      const id = payload.id
      const sample_type = await this.prisma.sample_type.findUnique({
        where: { id },
      });
  
      if (!sample_type) {
        return await this.prisma.sample_type.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.sample_type.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.sample_type.findMany({
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
          return await this.prisma.sample_type.findMany({
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
          return await this.prisma.sample_type.findMany({
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
        return await this.prisma.sample_type.findMany({
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
