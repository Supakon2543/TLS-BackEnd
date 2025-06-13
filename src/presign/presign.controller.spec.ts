import { Test, TestingModule } from '@nestjs/testing';
import { PresignController } from './presign.controller';
import { PresignService } from './presign.service';

describe('PresignController', () => {
  let controller: PresignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresignController],
      providers: [PresignService],
    }).compile();

    controller = module.get<PresignController>(PresignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
