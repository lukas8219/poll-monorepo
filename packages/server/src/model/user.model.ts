import { DataTypes, Model, Optional } from 'sequelize';
import Database from 'src/database';
import { UserPhoto } from './user.photo.model';

export interface UserAttribute {
  id?: number;
  email: string;
  name: string;
  phoneNumber?: string;
  password?: string;
  createdAt: Date;
  aboutMe?: string;
  userPhoto?: UserPhoto;
}

export class User extends Model<UserAttribute, UserInput> implements UserAttribute {
  id?: number;
  email: string;
  name: string;
  phoneNumber?: string;
  password?: string;
  createdAt: Date;
  aboutMe?: string;
  userPhoto?: UserPhoto;
}

export interface UserInput extends Optional<UserAttribute, 'id'> {}
export interface UserOutput extends Required<UserAttribute> {}

export default User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      field: 'id',
    },
    email: {
      type: DataTypes.TEXT,
      field: 'email',
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      field: 'name',
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      field: 'phone_number',
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    aboutMe: {
      type: DataTypes.TEXT,
      field: 'about_me',
    },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'users'
  },
);

User.hasOne(UserPhoto, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
    field: 'user_id'
  },
  as: 'userPhoto',
});