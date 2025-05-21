import { Body, Injectable, NotFoundException, Param, Req, Request, Response } from '@nestjs/common';
import { CreateLabSiteDto } from './dto/create-lab_site.dto';
import { UpdateLabSiteDto } from './dto/update-lab_site.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LabSiteService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateLabSiteDto/*, @Response() res: Response*/) {
      return await this.prisma.lab_site.create({
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
      return this.prisma.lab_site.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const lab_site = await this.prisma.lab_site.findUnique({
        where: { id },
      });
  
      if (!lab_site) {
        throw new NotFoundException(`Lab site with ID ${id} not found`);
      }
  
      return lab_site;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateLabSiteDto/*, @Response() res: Response*/) {
  
      const existingLabSite = await this.prisma.lab_site.findUnique({ where: { id } });
  
      if (!existingLabSite) {
        throw new NotFoundException(`Lab site with ID ${id} not found`);
      }
  
      return await this.prisma.lab_site.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const lab_site = await this.prisma.lab_site.findUnique({
        where: { id },
      });
  
      if (!lab_site) {
        throw new NotFoundException(`Lab Site with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.lab_site.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateLabSiteDto/*, @Response() res: Response*/) {
      const id = payload.id
      const lab_site = await this.prisma.lab_site.findUnique({
        where: { id },
      });
  
      if (!lab_site) {
        return await this.prisma.lab_site.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.lab_site.update({
        where: { id },
        data: payload,
      });
    }

    async find(/*@Request() req: Request, @Response() res: Response*/) {
      return await this.prisma.lab_site.findMany({
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
