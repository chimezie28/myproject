import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
  id: number;
  full_name: string;
  email: string;
  password: string;
  reset_password_token?: string;
  unique_session_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public reset_password_token?: string;
  public unique_session_id?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reset_password_token: {
      type: DataTypes.STRING,
      unique: true,
    },
    unique_session_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
