"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Chat extends sequelize_1.Model {
}
Chat.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    sender_id: sequelize_1.DataTypes.BIGINT,
    receiver_id: sequelize_1.DataTypes.BIGINT,
    message: sequelize_1.DataTypes.TEXT,
    product_id: sequelize_1.DataTypes.BIGINT,
    order_id: sequelize_1.DataTypes.BIGINT,
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_1.default,
    modelName: 'Chat',
    tableName: 'chats',
    timestamps: true,
    underscored: true,
});
exports.default = Chat;
