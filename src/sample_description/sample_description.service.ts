import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateSampleDescriptionDto } from './dto/create-sample_description.dto';
import { UpdateSampleDescriptionDto } from './dto/update-sample_description.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleDescriptionService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateSampleDescriptionDto/*, @Response() res: Response*/) {
      return await this.prisma.sample_description.create({
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
      return this.prisma.sample_description.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const sample_description = await this.prisma.sample_description.findUnique({
        where: { id },
      });
  
      if (!sample_description) {
        throw new NotFoundException(`Sample Description with ID ${id} not found`);
      }
  
      return sample_description;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateSampleDescriptionDto/*, @Response() res: Response*/) {
  
      const existingSampleDescription = await this.prisma.sample_description.findUnique({ where: { id } });
  
      if (!existingSampleDescription) {
        throw new NotFoundException(`Sample Description with ID ${id} not found`);
      }
  
      return await this.prisma.sample_description.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const sample_description = await this.prisma.sample_description.findUnique({
        where: { id },
      });
  
      if (!sample_description) {
        throw new NotFoundException(`Sample Description with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.sample_description.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateSampleDescriptionDto/*, @Response() res: Response*/) {
      const id = payload.id
      const sample_description = await this.prisma.sample_description.findUnique({
        where: { id },
      });
  
      if (!sample_description) {
        return await this.prisma.sample_description.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.sample_description.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.sample_description.findMany({
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
          return await this.prisma.sample_description.findMany({
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
          return await this.prisma.sample_description.findMany({
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
        return await this.prisma.sample_description.findMany({
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
