import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateStatusRetainDto } from './dto/create-status_retain.dto';
import { UpdateStatusRetainDto } from './dto/update-status_retain.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusRetainService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateStatusRetainDto/*, @Response() res: Response*/) {
      return await this.prisma.status_retain.create({
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
      return this.prisma.status_retain.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const status_retain = await this.prisma.status_retain.findUnique({
        where: { id },
      });
  
      if (!status_retain) {
        throw new NotFoundException(`Status Retain with ID ${id} not found`);
      }
  
      return status_retain;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateStatusRetainDto/*, @Response() res: Response*/) {
  
      const existingStatusRetain = await this.prisma.status_retain.findUnique({ where: { id } });
  
      if (!existingStatusRetain) {
        throw new NotFoundException(`Status Retain with ID ${id} not found`);
      }
  
      return await this.prisma.status_retain.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const status_retain = await this.prisma.status_retain.findUnique({
        where: { id },
      });
  
      if (!status_retain) {
        throw new NotFoundException(`Status Retain with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.status_retain.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateStatusRetainDto/*, @Response() res: Response*/) {
      const id = payload.id
      const status_retain = await this.prisma.status_retain.findUnique({
        where: { id },
      });
  
      if (!status_retain) {
        return await this.prisma.status_retain.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.status_retain.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.status_retain.findMany({
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
          return await this.prisma.status_retain.findMany({
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
          return await this.prisma.status_retain.findMany({
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
        return await this.prisma.status_retain.findMany({
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
