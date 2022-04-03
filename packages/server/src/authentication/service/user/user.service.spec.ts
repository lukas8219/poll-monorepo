import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { UserAttribute } from 'src/model/user.model';
import { v4 as uuid } from 'uuid';
import { EncryptionService } from '../encryption.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const USER = {
    email: "email",
    password: "senha"
  };

  const USER_ID = uuid();

  beforeEach(async () => {

    const JWT_MODULE = JwtModule.register({
      secret: "1234",
      signOptions: {
        expiresIn: "60s",
      },
    });

    const EXISTING_EMAILS = ["email"];

    const mockRepo = {
      findByEmail: async (email:string) => {
        return EXISTING_EMAILS.includes(email) ? {
          ...USER,
          id: USER_ID
        } : undefined;
      },
      save: (data) => {
        return {
          ...data,
          id: USER_ID
        }
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [JWT_MODULE, PassportModule],
      providers: [UserService, UserRepository, EncryptionService],
    })
    .overrideProvider(UserRepository)
    .useValue(mockRepo)
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return email objt', () => {
    expect(service.findUserByEmail("tal email")).toStrictEqual(Promise.resolve(USER));
  })

  it('should return error if user already exists', () => {
    expect(async () => {
      return service.createUser({
        name: "Lucas",
        password: "1234",
        email: "email"
      });
    })
    .rejects
    .toThrowError('user.already.exists')
  });

  it('should create the user if email does not exist', async () => {

    const DATA = {
      name: "Lucas",
      password: "1234",
      email: "outro_email"
    }

    const HEX_PATTERN = /^[0-9a-f]+$/i;

    const user : UserAttribute = await service.createUser(DATA); 

    expect(user.name).toBe(DATA.name);
    expect(user.email).toBe(DATA.email);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.id).toBeDefined();
    expect(user.password).toMatch(HEX_PATTERN)

  })

  it('should edit user', async () => {

    const EXPECTED = {
      id: USER_ID,
      name: "Editado",
      email: "tal_email",
      password: "senha",
    }

    const RESULT = await service.editUser({
      name: "Editado",
      email: "tal_email"
    },
    {
      id: USER_ID,
      email: "email"
    });

    expect(RESULT)
    .toStrictEqual(EXPECTED)

  })
});
