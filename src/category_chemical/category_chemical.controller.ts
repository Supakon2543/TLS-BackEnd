import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryChemicalService } from './category_chemical.service';
import { CreateCategoryChemicalDto } from './dto/create-category_chemical.dto';
import { UpdateCategoryChemicalDto } from './dto/update-category_chemical.dto';

@Controller('category-chemical')
export class CategoryChemicalController {
  constructor(private readonly categoryChemicalService: CategoryChemicalService) {}

    @Post('create')
    create(@Body() payload: CreateCategoryChemicalDto) {
      return this.categoryChemicalService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateCategoryChemicalDto/*, @Response() res: Response*/) {
      return this.categoryChemicalService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      return this.categoryChemicalService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.categoryChemicalService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.categoryChemicalService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateCategoryChemicalDto) {
      return this.categoryChemicalService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.categoryChemicalService.remove(id);
    }
}
