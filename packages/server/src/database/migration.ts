import { SyncOptions } from 'sequelize';
import { Poll } from 'src/model/poll.model';
import { User } from 'src/model/user.model';
import { UserPhoto } from 'src/model/user.photo.model';

export default async function syncDb() {
  const options: SyncOptions = { alter: true, logging: false };
  await Poll.sync(options);
  await User.sync(options);
  await UserPhoto.sync(options);
}
