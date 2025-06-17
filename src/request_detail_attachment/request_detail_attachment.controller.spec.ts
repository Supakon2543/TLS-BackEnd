import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailAttachmentController } from './request_detail_attachment.controller';
import { RequestDetailAttachmentService } from './request_detail_attachment.service';

describe('RequestDetailAttachmentController', () => {
  let controller: RequestDetailAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestDetailAttachmentController],
      providers: [RequestDetailAttachmentService],
    }).compile();

    controller = module.get<RequestDetailAttachmentController>(RequestDetailAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
