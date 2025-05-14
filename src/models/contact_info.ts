import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'; // Adjust this path if needed

interface ContactInfoAttributes {
  id: number;
  user_id: number;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date;
}

interface ContactInfoCreationAttributes extends Optional<ContactInfoAttributes, 'id'> {}

class ContactInfo extends Model<ContactInfoAttributes, ContactInfoCreationAttributes> implements ContactInfoAttributes {
  public id!: number;
  public user_id!: number;
  public phone_number!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;
  public created_at!: Date;
  public updated_at!: Date;

}

ContactInfo.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'contact_info',
    timestamps: false,
    underscored: true,
  }
);

export default ContactInfo;
