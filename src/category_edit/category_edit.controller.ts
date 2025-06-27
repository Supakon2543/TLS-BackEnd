import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryEditService } from './category_edit.service';
import { CreateCategoryEditDto } from './dto/create-category_edit.dto';
import { UpdateCategoryEditDto } from './dto/update-category_edit.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('bearer')
// @UseGuards(AuthGuard('jwt'))
@Controller('category-edit')
export class CategoryEditController {
  constructor(private readonly categoryEditService: CategoryEditService) {}

  @ApiOperation({ summary: 'create new category_edit' })
  @Post()
  create(@Body() createCategoryEditDto: CreateCategoryEditDto) {
    return this.categoryEditService.createOrUpdate(createCategoryEditDto);
  }

  @ApiOperation({ summary: 'create new category_edit' })
  @Get()
  getBoxes(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.categoryEditService.getcategory_edit(params);
  }

  @ApiOperation({ summary: 'get category_edit by id ' })
  @Get()
  findAll() {
    return this.categoryEditService.findAll();
  }

  @ApiOperation({ summary: 'get category_edit by id ' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryEditService.findOne(+id);
  }

  @ApiOperation({ summary: 'update category_edit by id' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryEditDto: UpdateCategoryEditDto,
  ) {
    return this.categoryEditService.update(+id, updateCategoryEditDto);
  }

  @ApiOperation({ summary: 'delete category_edit by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryEditService.remove(+id);
  }
}
