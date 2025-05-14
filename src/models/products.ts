import {
  DataTypes,
  Model,
  Optional,
  HasManyAddAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from 'sequelize';
import sequelize from '../config/db';
import ProductMedia from './product_media';

interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  description: string;
  discount: number;
  tax: number;
  stock: number;
  expiration_date: Date | null;
  animal_name: string;
  animal_dob: Date | null;
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

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'breed_id' | 'species_id' | 'created_at' | 'updated_at'> {}

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

  // 🔗 Association Mixins
  public setMedia!: HasManySetAssociationsMixin<ProductMedia, number>;
  public getMedia!: HasManyGetAssociationsMixin<ProductMedia>;
  public addMedia!: HasManyAddAssociationMixin<ProductMedia, number>;
  public hasMedia!: HasManyHasAssociationMixin<ProductMedia, number>;
  public countMedia!: HasManyCountAssociationsMixin;
  public createMedia!: HasManyCreateAssociationMixin<ProductMedia>;
}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    expiration_date: {
      type: DataTypes.DATE,
    },
    animal_name: {
      type: DataTypes.STRING,
    },
    animal_dob: {
      type: DataTypes.DATE,
    },
    animal_weight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    health_condition: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
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
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
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
