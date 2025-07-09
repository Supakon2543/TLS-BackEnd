import { Test, TestingModule } from '@nestjs/testing';
import { LocationEmailController } from './location_email.controller';
import { LocationEmailService } from './location_email.service';

describe('LocationEmailController', () => {
  let controller: LocationEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationEmailController],
      providers: [LocationEmailService],
    }).compile();

    controller = module.get<LocationEmailController>(LocationEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
