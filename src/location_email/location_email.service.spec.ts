import { Test, TestingModule } from '@nestjs/testing';
import { LocationEmailService } from './location_email.service';

describe('LocationEmailService', () => {
  let service: LocationEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationEmailService],
    }).compile();

    service = module.get<LocationEmailService>(LocationEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
