"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class ProductReview extends sequelize_1.Model {
}
ProductReview.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: sequelize_1.DataTypes.BIGINT,
    product_id: sequelize_1.DataTypes.BIGINT,
    rating: sequelize_1.DataTypes.INTEGER,
    review: sequelize_1.DataTypes.TEXT,
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_1.default,
    modelName: 'ProductReview',
    tableName: 'product_reviews',
    timestamps: true,
    underscored: true,
});
exports.default = ProductReview;
