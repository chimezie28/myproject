"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const products_1 = __importDefault(require("../models/products"));
const product_media_1 = __importDefault(require("../models/product_media"));
const contact_info_1 = __importDefault(require("../models/contact_info"));
const payment_methods_1 = __importDefault(require("../models/payment_methods"));
const delivery_methods_1 = __importDefault(require("../models/delivery_methods"));
const orders_1 = __importDefault(require("../models/orders"));
const product_reviews_1 = __importDefault(require("../models/product_reviews"));
const chats_1 = __importDefault(require("../models/chats"));
const animal_species_1 = __importDefault(require("../models/animal_species"));
const animal_breeds_1 = __importDefault(require("../models/animal_breeds"));
const orderPayment_1 = __importDefault(require("../models/orderPayment"));
const orderDelivery_1 = __importDefault(require("../models/orderDelivery"));
const associateModels = () => {
    // User ↔ Product
    users_1.default.hasMany(products_1.default, { foreignKey: 'user_id', as: 'products' });
    products_1.default.belongsTo(users_1.default, { foreignKey: 'user_id', as: 'user' });
    // Product ↔ ProductMedia
    products_1.default.hasMany(product_media_1.default, { foreignKey: 'product_id', as: 'media' });
    product_media_1.default.belongsTo(products_1.default, { foreignKey: 'product_id', as: 'product' });
    // User ↔ ContactInfo
    users_1.default.hasOne(contact_info_1.default, { foreignKey: 'user_id', as: 'contact_info' });
    contact_info_1.default.belongsTo(users_1.default, { foreignKey: 'user_id', as: 'user' });
    // PaymentMethod ↔ Order
    payment_methods_1.default.hasMany(orders_1.default, { foreignKey: 'payment_method', as: 'orders' });
    orders_1.default.belongsTo(payment_methods_1.default, { foreignKey: 'payment_method', as: 'paymentMethod' }); // Fixed collision here
    // DeliveryMethod ↔ Order
    delivery_methods_1.default.hasMany(orders_1.default, { foreignKey: 'delivery_method', as: 'orders' });
    orders_1.default.belongsTo(delivery_methods_1.default, { foreignKey: 'delivery_method', as: 'deliveryMethod' });
    // Product ↔ Order
    products_1.default.hasMany(orders_1.default, { foreignKey: 'product_id', as: 'orders' });
    orders_1.default.belongsTo(products_1.default, { foreignKey: 'product_id', as: 'product' });
    // User ↔ Order (as Buyer)
    users_1.default.hasMany(orders_1.default, { foreignKey: 'buyer_id', as: 'buyer_orders' });
    orders_1.default.belongsTo(users_1.default, { foreignKey: 'buyer_id', as: 'buyer' });
    // User ↔ Order (as Seller)
    users_1.default.hasMany(orders_1.default, { foreignKey: 'seller_id', as: 'seller_orders' });
    orders_1.default.belongsTo(users_1.default, { foreignKey: 'seller_id', as: 'seller' });
    // Product ↔ ProductReview
    products_1.default.hasMany(product_reviews_1.default, { foreignKey: 'product_id', as: 'reviews' });
    product_reviews_1.default.belongsTo(products_1.default, { foreignKey: 'product_id', as: 'product' });
    // User ↔ ProductReview
    users_1.default.hasMany(product_reviews_1.default, { foreignKey: 'user_id', as: 'reviews' });
    product_reviews_1.default.belongsTo(users_1.default, { foreignKey: 'user_id', as: 'user' });
    // Chat ↔ User (Sender & Receiver)
    users_1.default.hasMany(chats_1.default, { foreignKey: 'sender_id', as: 'sent_chats' });
    chats_1.default.belongsTo(users_1.default, { foreignKey: 'sender_id', as: 'sender' });
    users_1.default.hasMany(chats_1.default, { foreignKey: 'receiver_id', as: 'received_chats' });
    chats_1.default.belongsTo(users_1.default, { foreignKey: 'receiver_id', as: 'receiver' });
    // Chat ↔ Product (optional)
    products_1.default.hasMany(chats_1.default, { foreignKey: 'product_id', as: 'product_chats' });
    chats_1.default.belongsTo(products_1.default, { foreignKey: 'product_id', as: 'product' });
    // Chat ↔ Order (optional)
    orders_1.default.hasMany(chats_1.default, { foreignKey: 'order_id', as: 'order_chats' });
    chats_1.default.belongsTo(orders_1.default, { foreignKey: 'order_id', as: 'order' });
    // Product ↔ AnimalBreed
    animal_breeds_1.default.hasMany(products_1.default, { foreignKey: 'breed_id', as: 'products' });
    products_1.default.belongsTo(animal_breeds_1.default, { foreignKey: 'breed_id', as: 'breed' });
    // Product ↔ AnimalSpecies
    animal_species_1.default.hasMany(products_1.default, { foreignKey: 'species_id', as: 'products' });
    products_1.default.belongsTo(animal_species_1.default, { foreignKey: 'species_id', as: 'species' });
    // OrderPayment ↔ PaymentMethod
    payment_methods_1.default.hasMany(orderPayment_1.default, { foreignKey: 'payment_method_id', as: 'order_payments' });
    orderPayment_1.default.belongsTo(payment_methods_1.default, { foreignKey: 'payment_method_id', as: 'paymentMethod' });
    // OrderDelivery ↔ DeliveryMethod
    delivery_methods_1.default.hasMany(orderDelivery_1.default, { foreignKey: 'delivery_method', as: 'order_deliveries' });
    orderDelivery_1.default.belongsTo(delivery_methods_1.default, { foreignKey: 'delivery_method', as: 'deliveryMethod' });
    // Order ↔ OrderPayment
    orders_1.default.hasMany(orderPayment_1.default, { foreignKey: 'order_id', as: 'order_payments' });
    orderPayment_1.default.belongsTo(orders_1.default, { foreignKey: 'order_id', as: 'order' });
    // Order ↔ OrderDelivery
    orders_1.default.hasMany(orderDelivery_1.default, { foreignKey: 'order_id', as: 'order_deliveries' });
    orderDelivery_1.default.belongsTo(orders_1.default, { foreignKey: 'order_id', as: 'order' });
};
exports.default = associateModels;
