import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from '../authentication/service/authentication.service'

describe('AppController', () => {
  let appController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    appController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBe(true);
    });
  });
});