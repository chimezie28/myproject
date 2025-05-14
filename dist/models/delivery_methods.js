"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class DeliveryMethod extends sequelize_1.Model {
}
DeliveryMethod.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_1.default,
    modelName: 'DeliveryMethod',
    tableName: 'delivery_methods',
    timestamps: true,
    underscored: true,
});
exports.default = DeliveryMethod;
