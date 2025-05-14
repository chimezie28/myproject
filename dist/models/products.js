"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    tax: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    expiration_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    animal_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    animal_dob: {
        type: sequelize_1.DataTypes.DATE,
    },
    animal_weight: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    height: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    health_condition: {
        type: sequelize_1.DataTypes.TEXT,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    breed_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    species_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    underscored: true,
});
exports.default = Product;
