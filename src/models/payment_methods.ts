import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface PaymentMethodsAttributes {
  id: number;
  name: string;
  currency: string;
  date: Date;
}

interface PaymentMethodsCreationAttributes extends Optional<PaymentMethodsAttributes, 'id'> {}

class PaymentMethods extends Model<PaymentMethodsAttributes, PaymentMethodsCreationAttributes> implements PaymentMethodsAttributes {
  public id!: number;
  public name!: string;
  public currency!: string;
  public date!: Date;
}

PaymentMethods.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    currency: DataTypes.STRING,
    date: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'PaymentMethods',
    tableName: 'payment_methods',
    timestamps: true,
    underscored: true,
  }
);

export default PaymentMethods;
