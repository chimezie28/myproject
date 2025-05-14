"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class AnimalBreed extends sequelize_1.Model {
}
AnimalBreed.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    animal_species_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    date_created: sequelize_1.DataTypes.DATE,
    date_modified: sequelize_1.DataTypes.DATE,
    image_url: sequelize_1.DataTypes.STRING,
}, {
    sequelize: db_1.default,
    modelName: 'AnimalBreed',
    tableName: 'animal_breeds',
    timestamps: false,
    underscored: true,
});
exports.default = AnimalBreed;
