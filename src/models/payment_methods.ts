import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface PaymentMethodAttributes {
  id: number;
  name: string;
  reference: string;
  currency: string;
  date: Date;
}

interface PaymentMethodCreationAttributes extends Optional<PaymentMethodAttributes, 'id'> {}

class PaymentMethod extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes> implements PaymentMethodAttributes {
  public id!: number;
  public name!: string;
  public reference!: string;
  public currency!: string;
  public date!: Date;
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods',
    timestamps: false,
    underscored: true,
  }
);

export default PaymentMethod;
