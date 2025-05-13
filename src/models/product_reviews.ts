import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './products';
import User from './users';

interface ProductReviewsAttributes {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductReviewsCreationAttributes extends Optional<ProductReviewsAttributes, 'id'> {}

class ProductReviews extends Model<ProductReviewsAttributes, ProductReviewsCreationAttributes> implements ProductReviewsAttributes {
  public id!: number;
  public product_id!: number;
  public user_id!: number;
  public rating!: number;
  public comment?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProductReviews.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'ProductReviews',
    tableName: 'product_reviews',
    timestamps: true,
    underscored: true,
  }
);

export default ProductReviews;
