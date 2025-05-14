import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import AnimalSpecies from './animal_species';

interface AnimalBreedAttributes {
  id: number;
  name: string;
  animal_species_id: number;
  date_created?: Date;
  date_modified?: Date;
  image_url?: string;
}

interface AnimalBreedCreationAttributes extends Optional<AnimalBreedAttributes, 'id'> {}

class AnimalBreed extends Model<AnimalBreedAttributes, AnimalBreedCreationAttributes> implements AnimalBreedAttributes {
  public id!: number;
  public name!: string;
  public animal_species_id!: number;
  public date_created?: Date;
  public date_modified?: Date;
  public image_url?: string;
}

AnimalBreed.init(
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
    animal_species_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date_created: DataTypes.DATE,
    date_modified: DataTypes.DATE,
    image_url: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'AnimalBreed',
    tableName: 'animal_breeds',
    timestamps: false,
    underscored: true,
  }
);

export default AnimalBreed;
