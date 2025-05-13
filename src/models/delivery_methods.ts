import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface DeliveryMethodsAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface DeliveryMethodsCreationAttributes extends Optional<DeliveryMethodsAttributes, 'id'> {}

class DeliveryMethods extends Model<DeliveryMethodsAttributes, DeliveryMethodsCreationAttributes> implements DeliveryMethodsAttributes {
  public id!: number;
  public name!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

DeliveryMethods.init(
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'DeliveryMethods',
    tableName: 'delivery_methods',
    timestamps: true,
    underscored: true,
  }
);

export default DeliveryMethods;
