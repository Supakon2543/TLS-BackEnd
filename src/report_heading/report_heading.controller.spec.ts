import { Test, TestingModule } from '@nestjs/testing';
import { ReportHeadingController } from './report_heading.controller';
import { ReportHeadingService } from './report_heading.service';

describe('ReportHeadingController', () => {
  let controller: ReportHeadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportHeadingController],
      providers: [ReportHeadingService],
    }).compile();

    controller = module.get<ReportHeadingController>(ReportHeadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
