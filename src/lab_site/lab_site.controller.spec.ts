import { Test, TestingModule } from '@nestjs/testing';
import { LabSiteController } from './lab_site.controller';
import { LabSiteService } from './lab_site.service';

describe('LabSiteController', () => {
  let controller: LabSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabSiteController],
      providers: [LabSiteService],
    }).compile();

    controller = module.get<LabSiteController>(LabSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
