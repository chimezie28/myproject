import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './products';
import User from './users';
import ContactInfo from './contact_info';
import PaymentMethod from './payment_methods';
import OrderDelivery from './orderDelivery';

interface OrderAttributes {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  seller_id: number;
  buyer_id: number;
  contact_info_id: number;
  payment_method: number;
  delivery_method: number;
  created_at?: Date;
  updated_at?: Date;
  order_reference: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  public seller_id!: number;
  public buyer_id!: number;
  public contact_info_id!: number;
  public payment_method!: number;
  public delivery_method!: number;
  public created_at?: Date;
  public updated_at?: Date;
  public order_reference!: string;
}

Order.init(
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
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
    },
    payment_method: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    delivery_method: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    order_reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);

Order.belongsTo(Product, { foreignKey: 'product_id' });
Order.belongsTo(User, { foreignKey: 'seller_id' });
Order.belongsTo(User, { foreignKey: 'buyer_id' });
Order.belongsTo(ContactInfo, { foreignKey: 'contact_info_id' });
Order.belongsTo(PaymentMethod, { foreignKey: 'payment_method' });
Order.belongsTo(OrderDelivery, { foreignKey: 'delivery_method' });

export default Order;
