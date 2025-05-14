"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ProductMedia extends sequelize_1.Model {
}
ProductMedia.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_created: sequelize_1.DataTypes.DATE,
    last_date_modified: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_1.default,
    modelName: 'ProductMedia',
    tableName: 'product_media',
    timestamps: false,
    underscored: true,
});
exports.default = ProductMedia;
