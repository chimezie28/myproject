import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import DeliveryMethod from './delivery_methods';

interface OrderDeliveryAttributes {
  id: number;
  delivery_method: number;
  delivery_status: string;
  shipping_reference: string;
  shipped_at: Date;
  processed_at: Date;
  delivered_at: Date;
}

interface OrderDeliveryCreationAttributes extends Optional<OrderDeliveryAttributes, 'id'> {}

class OrderDelivery extends Model<OrderDeliveryAttributes, OrderDeliveryCreationAttributes> implements OrderDeliveryAttributes {
  public id!: number;
  public delivery_method!: number;
  public delivery_status!: string;
  public shipping_reference!: string;
  public shipped_at!: Date;
  public processed_at!: Date;
  public delivered_at!: Date;
}

OrderDelivery.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    delivery_method: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    delivery_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipped_at: DataTypes.DATE,
    processed_at: DataTypes.DATE,
    delivered_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'OrderDelivery',
    tableName: 'order_delivery',
    timestamps: false,
    underscored: true,
  }
);

OrderDelivery.belongsTo(DeliveryMethod, { foreignKey: 'delivery_method' });

export default OrderDelivery;
