import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface AnimalSpeciesAttributes {
  id: number;
  name: string;
  date_created: Date;
  last_date_modified: Date;
  image_url: string;
}

interface AnimalSpeciesCreationAttributes extends Optional<AnimalSpeciesAttributes, 'id'> {}

class AnimalSpecies extends Model<AnimalSpeciesAttributes, AnimalSpeciesCreationAttributes> implements AnimalSpeciesAttributes {
  public id!: number;
  public name!: string;
  public date_created!: Date;
  public last_date_modified!: Date;
  public image_url!: string;
}

AnimalSpecies.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    date_created: DataTypes.DATE,
    last_date_modified: DataTypes.DATE,
    image_url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'AnimalSpecies',
    tableName: 'animal_species',
    timestamps: true,
    underscored: true,
  }
);

export default AnimalSpecies;
