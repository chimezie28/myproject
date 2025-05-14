"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const delivery_methods_1 = __importDefault(require("./delivery_methods"));
class OrderDelivery extends sequelize_1.Model {
}
OrderDelivery.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    delivery_method: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    delivery_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shipping_reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shipped_at: sequelize_1.DataTypes.DATE,
    processed_at: sequelize_1.DataTypes.DATE,
    delivered_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_1.default,
    modelName: 'OrderDelivery',
    tableName: 'order_delivery',
    timestamps: false,
    underscored: true,
});
OrderDelivery.belongsTo(delivery_methods_1.default, { foreignKey: 'delivery_method' });
exports.default = OrderDelivery;
