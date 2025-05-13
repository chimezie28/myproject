import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Product from './products';

interface ProductMediaAttributes {
  id: number;
  product_id: number;
  image_url: string;
  date_created: Date;
  last_date_modified: Date;
}

interface ProductMediaCreationAttributes extends Optional<ProductMediaAttributes, 'id'> {}

class ProductMedia extends Model<ProductMediaAttributes, ProductMediaCreationAttributes> implements ProductMediaAttributes {
  public id!: number;
  public product_id!: number;
  public image_url!: string;
  public date_created!: Date;
  public last_date_modified!: Date;
}

ProductMedia.init(
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
    image_url: DataTypes.STRING,
    date_created: DataTypes.DATE,
    last_date_modified: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'ProductMedia',
    tableName: 'product_media',
    timestamps: true,
    underscored: true,
  }
);

export default ProductMedia;
