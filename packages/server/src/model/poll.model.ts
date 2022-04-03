import { DataTypes, Model, Optional } from 'sequelize';
import Database from 'src/database';

export interface PollAttributes {
  id?: number;
  description: string;
  subject: string;
  expiresAt: Date;
  createdBy: number;
  reportedAt?: Date;
  createdAt: Date;
}

export class Poll
  extends Model<PollAttributes, PollInput>
  implements PollAttributes
{
  id?: number;
  subject: string;
  description: string;
  expiresAt: Date;
  createdBy: number;
  reportedAt?: Date;
  createdAt: Date;
}

export interface PollInput extends Optional<PollAttributes, 'id'> {}
export interface PollOutput extends Required<PollAttributes> {}

export default Poll.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reportedAt: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'polls',
  },
);
