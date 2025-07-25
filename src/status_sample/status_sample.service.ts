import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateStatusSampleDto } from './dto/create-status_sample.dto';
import { UpdateStatusSampleDto } from './dto/update-status_sample.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusSampleService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateStatusSampleDto/*, @Response() res: Response*/) {
      return await this.prisma.status_sample.create({
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
      return this.prisma.status_sample.findMany({
        orderBy: [
            { order: 'asc' },
            { name: 'asc' },
          ],
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const status_sample = await this.prisma.status_sample.findUnique({
        where: { id },
      });
  
      if (!status_sample) {
        throw new NotFoundException(`Status Sample with ID ${id} not found`);
      }
  
      return status_sample;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateStatusSampleDto/*, @Response() res: Response*/) {
  
      const existingStatusSample = await this.prisma.status_sample.findUnique({ where: { id } });
  
      if (!existingStatusSample) {
        throw new NotFoundException(`Status Sample with ID ${id} not found`);
      }
  
      return await this.prisma.status_sample.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const status_sample = await this.prisma.status_sample.findUnique({
        where: { id },
      });
  
      if (!status_sample) {
        throw new NotFoundException(`Status Sample with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.status_sample.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateStatusSampleDto/*, @Response() res: Response*/) {
      const id = payload.id
      const status_sample = await this.prisma.status_sample.findUnique({
        where: { id },
      });
  
      if (!status_sample) {
        return await this.prisma.status_sample.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.status_sample.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.status_sample.findMany({
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
          return await this.prisma.status_sample.findMany({
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
          return await this.prisma.status_sample.findMany({
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
        return await this.prisma.status_sample.findMany({
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
