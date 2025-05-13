import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './users';
import Product from './products';
import Orders from './orders';

interface ChatsAttributes {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  product_id?: number;
  order_id?: number;
  status: string;
  sent_at: Date;
}

interface ChatsCreationAttributes extends Optional<ChatsAttributes, 'id'> {}

class Chats extends Model<ChatsAttributes, ChatsCreationAttributes> implements ChatsAttributes {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public message!: string;
  public product_id?: number;
  public order_id?: number;
  public status!: string;
  public sent_at!: Date;
}

Chats.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sent_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Chats',
    tableName: 'chats',
    timestamps: true,
    underscored: true,
  }
);

export default Chats;
