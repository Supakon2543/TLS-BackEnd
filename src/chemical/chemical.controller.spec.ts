import { Test, TestingModule } from '@nestjs/testing';
import { ChemicalController } from './chemical.controller';
import { ChemicalService } from './chemical.service';

describe('ChemicalController', () => {
  let controller: ChemicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChemicalController],
      providers: [ChemicalService],
    }).compile();

    controller = module.get<ChemicalController>(ChemicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
