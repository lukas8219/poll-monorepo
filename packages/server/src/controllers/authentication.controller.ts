import { Controller, Get, Post, Body, SetMetadata } from '@nestjs/common';
import { SetPublic } from 'src/authentication/guards/public.guard';
import { AuthenticationService } from '../authentication/service/authentication.service';

@SetPublic()
@Controller('v1/authenticate')
export class AuthenticationController {
  constructor(private readonly appService: AuthenticationService) {}

  @Post()
  authenticate(@Body() body: AuthenticationDTO): any {
    return this.appService.authenticate(body);
  }
}

export interface AuthenticationDTO {
  email: string;
  password: string;
}
