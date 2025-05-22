import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateRoleDto/*, @Response() res: Response*/) {
      return await this.prisma.role.create({
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
      return this.prisma.role.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const role = await this.prisma.role.findUnique({
        where: { id },
      });
  
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
  
      return role;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateRoleDto/*, @Response() res: Response*/) {
  
      const existingrole = await this.prisma.role.findUnique({ where: { id } });
  
      if (!existingrole) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
  
      return await this.prisma.role.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const role = await this.prisma.role.findUnique({
        where: { id },
      });
  
      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.role.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateRoleDto/*, @Response() res: Response*/) {
      const id = payload.id
      const role = await this.prisma.role.findUnique({
        where: { id },
      });
  
      if (!role) {
        return await this.prisma.role.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.role.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.role.findMany({
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
          return await this.prisma.role.findMany({
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
          return await this.prisma.role.findMany({
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
        return await this.prisma.role.findMany({
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
