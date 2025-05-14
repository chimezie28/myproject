import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface ChatAttributes {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  product_id?: number;
  order_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'id'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public message!: string;
  public product_id?: number;
  public order_id?: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: DataTypes.BIGINT,
    receiver_id: DataTypes.BIGINT,
    message: DataTypes.TEXT,
    product_id: DataTypes.BIGINT,
    order_id: DataTypes.BIGINT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    timestamps: true,
    underscored: true,
  }
);

export default Chat;
