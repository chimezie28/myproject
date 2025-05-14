"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const products_1 = __importDefault(require("./products"));
const users_1 = __importDefault(require("./users"));
const contact_info_1 = __importDefault(require("./contact_info"));
const payment_methods_1 = __importDefault(require("./payment_methods"));
const orderDelivery_1 = __importDefault(require("./orderDelivery"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    seller_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    buyer_id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    contact_info_id: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    payment_method: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    delivery_method: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
    order_reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
});
Order.belongsTo(products_1.default, { foreignKey: 'product_id' });
Order.belongsTo(users_1.default, { foreignKey: 'seller_id' });
Order.belongsTo(users_1.default, { foreignKey: 'buyer_id' });
Order.belongsTo(contact_info_1.default, { foreignKey: 'contact_info_id' });
Order.belongsTo(payment_methods_1.default, { foreignKey: 'payment_method' });
Order.belongsTo(orderDelivery_1.default, { foreignKey: 'delivery_method' });
exports.default = Order;
