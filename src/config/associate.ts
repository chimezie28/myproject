import User from '../models/users.js';
import Product from '../models/products.js';
import ProductMedia from '../models/product_media.js';
import ContactInfo from '../models/contact_info.js';
import PaymentMethods from '../models/payment_methods.js';
import DeliveryMethods from '../models/delivery_methods.js';
import Orders from '../models/orders.js';
import ProductReviews from '../models/product_reviews.js';
import Chats from '../models/chats.js';

// Define relationships
const associateModels = () => {
  User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
  Product.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  Product.hasMany(ProductMedia, { foreignKey: 'product_id', as: 'media' });
  ProductMedia.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Users and ContactInfo
  User.hasOne(ContactInfo, { foreignKey: 'user_id', as: 'contact_info' });
  ContactInfo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // PaymentMethods and Orders
  PaymentMethods.hasMany(Orders, { foreignKey: 'payment_method_id', as: 'orders' });
  Orders.belongsTo(PaymentMethods, { foreignKey: 'payment_method_id', as: 'payment_method' });

  // DeliveryMethods and Orders
  DeliveryMethods.hasMany(Orders, { foreignKey: 'delivery_method_id', as: 'orders' });
  Orders.belongsTo(DeliveryMethods, { foreignKey: 'delivery_method_id', as: 'delivery_method' });

  // Orders and Products (through Orders)
  Product.hasMany(Orders, { foreignKey: 'product_id', as: 'orders' });
  Orders.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Users and Orders (buyers and sellers)
  User.hasMany(Orders, { foreignKey: 'buyer_id', as: 'buyer_orders' });
  Orders.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

  User.hasMany(Orders, { foreignKey: 'seller_id', as: 'seller_orders' });
  Orders.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

  // ProductReviews and Products
  Product.hasMany(ProductReviews, { foreignKey: 'product_id', as: 'reviews' });
  ProductReviews.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Users and ProductReviews
  User.hasMany(ProductReviews, { foreignKey: 'user_id', as: 'reviews' });
  ProductReviews.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Chats and Users
  User.hasMany(Chats, { foreignKey: 'sender_id', as: 'sent_chats' });
  Chats.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

  User.hasMany(Chats, { foreignKey: 'receiver_id', as: 'received_chats' });
  Chats.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

  // Product and Chats (if a product is involved in the chat)
  Product.hasMany(Chats, { foreignKey: 'product_id', as: 'product_chats' });
  Chats.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Orders and Chats (if a chat is related to an order)
  Orders.hasMany(Chats, { foreignKey: 'order_id', as: 'order_chats' });
  Chats.belongsTo(Orders, { foreignKey: 'order_id', as: 'order' });
};

export default associateModels;
