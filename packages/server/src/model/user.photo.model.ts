import { DataTypes, Model, Optional } from "sequelize";
import Database from 'src/database';

export interface UserPhotoAttribute {
    id?: number,
    folder: string,
    file: string,
    userId: number,
}

export interface UserPhotoInput extends Optional<UserPhotoAttribute, 'id'> {}
export interface UserPhotoOutput extends Required<UserPhotoAttribute>{} 

export class UserPhoto extends Model<UserPhotoAttribute, UserPhotoInput> implements UserPhotoAttribute{
    id?: number;
    folder: string;
    file: string;
    userId: number;
}

export default UserPhoto.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      field: 'id',
    },
    folder: {
      type: DataTypes.TEXT,
      field: 'folder',
    },
    file: {
      type: DataTypes.TEXT,
      field: 'file',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
      unique: true,
    }
    },
    {
        timestamps: false,
        sequelize: Database,
        tableName: 'user_photos'
});
