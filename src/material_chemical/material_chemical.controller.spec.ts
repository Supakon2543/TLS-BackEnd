import { Test, TestingModule } from '@nestjs/testing';
import { MaterialChemicalController } from './material_chemical.controller';
import { MaterialChemicalService } from './material_chemical.service';

describe('MaterialChemicalController', () => {
  let controller: MaterialChemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialChemicalController],
      providers: [MaterialChemicalService],
    }).compile();

    controller = module.get<MaterialChemicalController>(MaterialChemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
