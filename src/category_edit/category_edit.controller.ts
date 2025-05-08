import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryEditService } from './category_edit.service';
import { CreateCategoryEditDto } from './dto/create-category_edit.dto';
import { UpdateCategoryEditDto } from './dto/update-category_edit.dto';

@Controller('category-edit')
export class CategoryEditController {
  constructor(private readonly categoryEditService: CategoryEditService) {}

  @Post()
  create(@Body() createCategoryEditDto: CreateCategoryEditDto) {
    return this.categoryEditService.create(createCategoryEditDto);
  }

  @Get()
  findAll() {
    return this.categoryEditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryEditService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryEditDto: UpdateCategoryEditDto) {
    return this.categoryEditService.update(+id, updateCategoryEditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryEditService.remove(+id);
  }
}
