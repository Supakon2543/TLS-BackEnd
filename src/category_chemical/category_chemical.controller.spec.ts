import { Test, TestingModule } from '@nestjs/testing';
import { CategoryChemicalController } from './category_chemical.controller';
import { CategoryChemicalService } from './category_chemical.service';

describe('CategoryChemicalController', () => {
  let controller: CategoryChemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryChemicalController],
      providers: [CategoryChemicalService],
    }).compile();

    controller = module.get<CategoryChemicalController>(CategoryChemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
