import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDTO } from 'src/controllers/authentication/authentication.controller';
import { UserService } from './user/user.service';
import { EncryptionService } from './encryption.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encrypter : EncryptionService
  ) {}

  async authenticate(body: AuthenticationDTO): Promise<any> {
    const user = await this.validateUser(body.email, body.password);
    if (user) {
      const { email, id } = user;
      return this.login({ email, id });
    } else {
      throw new UnprocessableEntityException('user.not.found.or.password.wrong');
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticatedUserDTO> {
    const user = await this.userService.findUserByEmail(username);
    const encryptedInput = this.encrypter.encrypt(password);
    if (user && user.password === encryptedInput) {
      const { email, id } = user;
      return {
        email,
        id,
      };
    }
    return null;
  }

  async login(user: AuthenticatedUserDTO) {
    const jwtPayload = {
      email: user.email,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(jwtPayload),
      user: jwtPayload
    };
  }
}

interface AuthenticatedUserDTO {
  id: number;
  email: string;
}
