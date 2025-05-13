import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './users';
import AnimalBreed from './animal_breeds';
import AnimalSpecies from './animal_species';

interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  description: string;
  discount: number;
  tax: number;
  stock: number;
  expiration_date: Date;
  animal_name: string;
  animal_dob: Date;
  animal_weight: number;
  height: number;
  health_condition: string;
  address: string;
  user_id: number;
  breed_id?: number;
  species_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public price!: number;
  public description!: string;
  public discount!: number;
  public tax!: number;
  public stock!: number;
  public expiration_date!: Date;
  public animal_name!: string;
  public animal_dob!: Date;
  public animal_weight!: number;
  public height!: number;
  public health_condition!: string;
  public address!: string;
  public user_id!: number;
  public breed_id?: number;
  public species_id?: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    discount: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    expiration_date: DataTypes.DATE,
    animal_name: DataTypes.STRING,
    animal_dob: DataTypes.DATE,
    animal_weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    health_condition: DataTypes.TEXT,
    address: DataTypes.STRING,
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    breed_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    species_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    underscored: true,
  }
);

export default Product;
