import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './users';

interface ContactInfoAttributes {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  address: string;
  apartment: string;
  city: string;
  state_province: string;
  postal_code: string;
  phone_number: string;
  user_id: number;
}

interface ContactInfoCreationAttributes extends Optional<ContactInfoAttributes, 'id'> {}

class ContactInfo extends Model<ContactInfoAttributes, ContactInfoCreationAttributes> implements ContactInfoAttributes {
  public id!: number;
  public email!: string;
  public first_name!: string;
  public last_name!: string;
  public company!: string;
  public address!: string;
  public apartment!: string;
  public city!: string;
  public state_province!: string;
  public postal_code!: string;
  public phone_number!: string;
  public user_id!: number;
}

ContactInfo.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    company: DataTypes.STRING,
    address: DataTypes.STRING,
    apartment: DataTypes.STRING,
    city: DataTypes.STRING,
    state_province: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ContactInfo',
    tableName: 'contact_info',
    timestamps: true,
    underscored: true,
  }
);

export default ContactInfo;
