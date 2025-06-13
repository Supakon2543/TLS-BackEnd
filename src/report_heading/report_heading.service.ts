import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateReportHeadingDto } from './dto/create-report_heading.dto';
import { UpdateReportHeadingDto } from './dto/update-report_heading.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportHeadingService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateReportHeadingDto/*, @Response() res: Response*/) {
      return await this.prisma.report_heading.create({
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
      return this.prisma.report_heading.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const report_heading = await this.prisma.report_heading.findUnique({
        where: { id },
      });
  
      if (!report_heading) {
        throw new NotFoundException(`Report Heading with ID ${id} not found`);
      }
  
      return report_heading;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateReportHeadingDto/*, @Response() res: Response*/) {
  
      const existingReportHeading = await this.prisma.report_heading.findUnique({ where: { id } });
  
      if (!existingReportHeading) {
        throw new NotFoundException(`Report Heading with ID ${id} not found`);
      }
  
      return await this.prisma.report_heading.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const report_heading = await this.prisma.report_heading.findUnique({
        where: { id },
      });
  
      if (!report_heading) {
        throw new NotFoundException(`Report Heading with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.report_heading.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateReportHeadingDto/*, @Response() res: Response*/) {
      const id = payload.id
      const report_heading = await this.prisma.report_heading.findUnique({
        where: { id },
      });
  
      if (!report_heading) {
        return await this.prisma.report_heading.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.report_heading.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.report_heading.findMany({
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
          return await this.prisma.report_heading.findMany({
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
          return await this.prisma.report_heading.findMany({
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
        return await this.prisma.report_heading.findMany({
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
