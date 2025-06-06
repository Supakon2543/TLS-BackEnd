import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateStateDto/*, @Response() res: Response*/) {
      return await this.prisma.state.create({
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
      return this.prisma.state.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const state = await this.prisma.state.findUnique({
        where: { id },
      });
  
      if (!state) {
        throw new NotFoundException(`State with ID ${id} not found`);
      }
  
      return state;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateStateDto/*, @Response() res: Response*/) {
  
      const existingState = await this.prisma.state.findUnique({ where: { id } });
  
      if (!existingState) {
        throw new NotFoundException(`State with ID ${id} not found`);
      }
  
      return await this.prisma.state.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const state = await this.prisma.state.findUnique({
        where: { id },
      });
  
      if (!state) {
        throw new NotFoundException(`State with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.state.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateStateDto/*, @Response() res: Response*/) {
      const id = payload.id
      const state = await this.prisma.state.findUnique({
        where: { id },
      });
  
      if (!state) {
        return await this.prisma.state.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.state.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.state.findMany({
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
          return await this.prisma.state.findMany({
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
          return await this.prisma.state.findMany({
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
        return await this.prisma.state.findMany({
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
