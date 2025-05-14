import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface ProductReviewAttributes {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  review: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductReviewCreationAttributes extends Optional<ProductReviewAttributes, 'id'> {}

class ProductReview extends Model<ProductReviewAttributes, ProductReviewCreationAttributes>
  implements ProductReviewAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public rating!: number;
  public review!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProductReview.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: DataTypes.BIGINT,
    product_id: DataTypes.BIGINT,
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'ProductReview',
    tableName: 'product_reviews',
    timestamps: true,
    underscored: true,
  }
);

export default ProductReview;
