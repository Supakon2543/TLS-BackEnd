import { Test, TestingModule } from '@nestjs/testing';
import { AuthApiController } from './auth_api.controller';
import { AuthApiService } from './auth_api.service';

describe('AuthApiController', () => {
  let controller: AuthApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthApiController],
      providers: [AuthApiService],
    }).compile();

    controller = module.get<AuthApiController>(AuthApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
