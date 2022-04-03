import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { CreateUserDTO, EditUserDTO } from 'src/data/user.dto';
import { UserAttribute } from 'src/model/user.model';
import { EncryptionService } from 'src/authentication/service/encryption.service';
import { UserPrincipal } from 'src/decorators/principal';

@Injectable()
export class UserService {

  constructor(
    private repository: UserRepository,
    private encrypter: EncryptionService,
  ) { }

  async createUser(data: CreateUserDTO): Promise<UserAttribute> {
    const encryptedPass =     this.encrypter.encrypt(data.password);
    if (await this.repository.findByEmail(data.email)) {
      throw new UnprocessableEntityException('user.already.exists');
    }
    return this.repository.save({
      email: data.email,
      password: encryptedPass,
      name: data.name,
      createdAt: new Date(),
    });
  }

  async getUser(id: number): Promise<UserAttribute> {
    return this.repository.findByPk(id);
}

  async editUser(data : EditUserDTO, principal : UserPrincipal) : Promise<UserAttribute> {
    const user = await this.repository.findByEmail(principal.email);

    if (!user) {
      throw new NotFoundException('user.not.found');
    }

    if(user.id !== principal.id){
      throw new UnprocessableEntityException('user.already.exists');
    }

    user.email = data.email;
    user.name = data.name;

    return this.repository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserAttribute> | undefined {
    return this.repository.findByEmail(email);
  }
}