import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateUserLocationDto } from './dto/create-user_location.dto';
import { UpdateUserLocationDto } from './dto/update-user_location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserLocationService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateUserLocationDto/*, @Response() res: Response*/) {
      return await this.prisma.user_location.create({
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
      return this.prisma.user_location.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const user_location = await this.prisma.user_location.findUnique({
        where: { id },
      });
  
      if (!user_location) {
        throw new NotFoundException(`User Location with ID ${id} not found`);
      }
  
      return user_location;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateUserLocationDto/*, @Response() res: Response*/) {
  
      const existingUserLocation = await this.prisma.user_location.findUnique({ where: { id } });
  
      if (!existingUserLocation) {
        throw new NotFoundException(`User Location with ID ${id} not found`);
      }
  
      return await this.prisma.user_location.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const user_location = await this.prisma.user_location.findUnique({
        where: { id },
      });
  
      if (!user_location) {
        throw new NotFoundException(`User Location with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.user_location.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateUserLocationDto/*, @Response() res: Response*/) {
      const id = payload.id
      const user_location = await this.prisma.user_location.findUnique({
        where: { id },
      });
  
      if (!user_location) {
        return await this.prisma.user_location.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.user_location.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.user_location.findMany({
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
          return await this.prisma.user_location.findMany({
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
          return await this.prisma.user_location.findMany({
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
        return await this.prisma.user_location.findMany({
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
