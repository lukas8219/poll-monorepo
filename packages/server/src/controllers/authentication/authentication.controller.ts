import { Controller, Post, Body } from '@nestjs/common';
import { SetPublic } from 'src/authentication/guards/public.guard';
import { ShouldContainText } from 'src/validation/validationDelegate';
import { AuthenticationService } from '../../authentication/service/authentication.service';

export class AuthenticationDTO {
  @ShouldContainText("user.authenticate.email.notEmpty")
  email: string;
  @ShouldContainText("user.authenticate.password.notEmpty")
  password: string;
}

@SetPublic()
@Controller('/v1/authenticate')
export class AuthenticationController {
  constructor(private readonly appService: AuthenticationService) {}

  @Post()
  authenticate(@Body() body: AuthenticationDTO): any {
    return this.appService.authenticate(body);
  }
  
}