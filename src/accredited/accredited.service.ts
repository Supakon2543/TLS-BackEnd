import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateAccreditedDto } from './dto/create-accredited.dto';
import { UpdateAccreditedDto } from './dto/update-accredited.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccreditedService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateAccreditedDto/*, @Response() res: Response*/) {
      return await this.prisma.accredited.create({
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
      return this.prisma.accredited.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const accredited = await this.prisma.accredited.findUnique({
        where: { id },
      });
  
      if (!accredited) {
        throw new NotFoundException(`Accredited with ID ${id} not found`);
      }
  
      return accredited;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateAccreditedDto/*, @Response() res: Response*/) {
  
      const existingAccredited = await this.prisma.accredited.findUnique({ where: { id } });
  
      if (!existingAccredited) {
        throw new NotFoundException(`Accredited with ID ${id} not found`);
      }
  
      return await this.prisma.accredited.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const accredited = await this.prisma.accredited.findUnique({
        where: { id },
      });
  
      if (!accredited) {
        throw new NotFoundException(`Accredited with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.accredited.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateAccreditedDto/*, @Response() res: Response*/) {
      const id = payload.id
      const accredited = await this.prisma.accredited.findUnique({
        where: { id },
      });
  
      if (!accredited) {
        return await this.prisma.accredited.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.accredited.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.accredited.findMany({
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
          return await this.prisma.accredited.findMany({
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
          return await this.prisma.accredited.findMany({
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
        return await this.prisma.accredited.findMany({
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
