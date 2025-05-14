import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface DeliveryMethodAttributes {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface DeliveryMethodCreationAttributes extends Optional<DeliveryMethodAttributes, 'id'> {}

class DeliveryMethod extends Model<DeliveryMethodAttributes, DeliveryMethodCreationAttributes>
  implements DeliveryMethodAttributes {
  public id!: number;
  public name!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

DeliveryMethod.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'DeliveryMethod',
    tableName: 'delivery_methods',
    timestamps: true,
    underscored: true,
  }
);

export default DeliveryMethod;
