import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEditController } from './category_edit.controller';
import { CategoryEditService } from './category_edit.service';

describe('CategoryEditController', () => {
  let controller: CategoryEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryEditController],
      providers: [CategoryEditService],
    }).compile();

    controller = module.get<CategoryEditController>(CategoryEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
