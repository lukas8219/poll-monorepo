import { Injectable } from '@nestjs/common';
import { User, UserAttribute } from 'src/model/user.model';
import { UserPhoto } from 'src/model/user.photo.model';

@Injectable()
export class UserRepository {
  async findByEmail(email: string): Promise<UserAttribute | undefined> {
    return this.toJSON(async () => User.findOne({
      where: {
        email: email
      }
    }), true);
  }

  async findByPk(id : number) : Promise<UserAttribute | undefined> {
    return this.toJSON(async () => {
      return User.findByPk(id,  {
        include: {
          model: UserPhoto,
          as: 'userPhoto',
        },
      });
    })
  }

  async save(user: UserAttribute): Promise<UserAttribute | undefined> {

    if(user.id){
      return this.toJSON(async () =>{
        const result =  await User.findByPk(user.id);
        return result.save();
      });
    }

    return this.toJSON(async () =>  User.create(user));
  }

  private async toJSON(query : () => Promise<User | undefined>, password? : boolean) : Promise<UserAttribute | undefined> {
    const queryResult = await query();
    if(queryResult){
      const persistedUser = queryResult.toJSON();
      if(!password){
        delete persistedUser['password'];
      }
      return persistedUser;
    }
    return undefined;
  }
}
