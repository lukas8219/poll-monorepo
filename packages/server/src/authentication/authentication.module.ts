import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserRepository } from './repository/user.repository';
import { AuthenticationService } from './service/authentication.service';
import { EncryptionService } from './service/encryption.service';
import { UserService } from './service/user/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import {JWT_SECRET, EXPIRE_TIME} from './security.constants';
import { UserPhotoService } from './service/user/user.photo.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: EXPIRE_TIME,
      },
    }),
  ],
  providers: [
    AuthenticationService,
    EncryptionService,
    UserService,
    UserRepository,
    JwtStrategy,
    UserPhotoService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthenticationService, UserRepository, EncryptionService, UserPhotoService],
})
export class AuthenticationModule {}
