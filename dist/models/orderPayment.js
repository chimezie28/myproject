"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const payment_methods_1 = __importDefault(require("./payment_methods"));
class OrderPayment extends sequelize_1.Model {
}
OrderPayment.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    payment_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    payment_method_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    payment_method_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    payment_reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'OrderPayment',
    tableName: 'order_payment',
    timestamps: false,
    underscored: true,
});
OrderPayment.belongsTo(payment_methods_1.default, { foreignKey: 'payment_method_id' });
exports.default = OrderPayment;
