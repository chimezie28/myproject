import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './products';
import User from './users';
import ContactInfo from './contact_info';
import PaymentMethods from './payment_methods';
import DeliveryMethods from './delivery_methods';

interface OrdersAttributes {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  seller_id: number;
  buyer_id: number;
  contact_info_id: number;
  payment_method_id: number;
  delivery_method_id: number;
  created_at?: Date;
  updated_at?: Date;
}

interface OrdersCreationAttributes extends Optional<OrdersAttributes, 'id'> {}

class Orders extends Model<OrdersAttributes, OrdersCreationAttributes> implements OrdersAttributes {
  public id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  public seller_id!: number;
  public buyer_id!: number;
  public contact_info_id!: number;
  public payment_method_id!: number;
  public delivery_method_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Orders.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    seller_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    buyer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contact_info_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    delivery_method_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Orders',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);

export default Orders;
