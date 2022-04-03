import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { PollRepository } from './repository/poll.repository';
import { PollController } from './controllers/poll/poll.controller';
import { PollService } from './service/poll/poll.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './authentication/service/user/user.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserFacade } from './facade/user.facade';

@Module({
  imports: [
    AuthenticationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
  ],
  controllers: [AuthenticationController, PollController, UserController],
  providers: [PollRepository, PollService, UserService, UserFacade],
})
export class AppModule {}
