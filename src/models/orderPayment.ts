import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import PaymentMethod from './payment_methods';

interface OrderPaymentAttributes {
  id: number;
  payment_status: string;
  payment_method_id: number;
  payment_method_name: string;
  payment_reference: string;
  created_at: Date;
}

interface OrderPaymentCreationAttributes extends Optional<OrderPaymentAttributes, 'id'> {}

class OrderPayment extends Model<OrderPaymentAttributes, OrderPaymentCreationAttributes> implements OrderPaymentAttributes {
  public id!: number;
  public payment_status!: string;
  public payment_method_id!: number;
  public payment_method_name!: string;
  public payment_reference!: string;
  public created_at!: Date;
}

OrderPayment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    payment_method_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderPayment',
    tableName: 'order_payment',
    timestamps: false,
    underscored: true,
  }
);

OrderPayment.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id' });

export default OrderPayment;
