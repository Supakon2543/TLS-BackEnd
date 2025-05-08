import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalParameterController } from './chemical_parameter.controller';
import { ChemicalParameterService } from './chemical_parameter.service';

describe('ChemicalParameterController', () => {
  let controller: ChemicalParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChemicalParameterController],
      providers: [ChemicalParameterService],
    }).compile();

    controller = module.get<ChemicalParameterController>(ChemicalParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
