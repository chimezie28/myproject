import User from '../models/users';
import Product from '../models/products';
import ProductMedia from '../models/product_media';
import ContactInfo from '../models/contact_info';
import PaymentMethod from '../models/payment_methods';
import DeliveryMethod from '../models/delivery_methods';
import Order from '../models/orders';
import ProductReview from '../models/product_reviews';
import Chat from '../models/chats';
import AnimalSpecies from '../models/animal_species';
import AnimalBreed from '../models/animal_breeds';
import OrderPayment from '../models/orderPayment';
import OrderDelivery from '../models/orderDelivery';

const associateModels = () => {
  // User ↔ Product
  User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
  Product.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Product ↔ ProductMedia
  Product.hasMany(ProductMedia, { foreignKey: 'product_id', as: 'media' });
  ProductMedia.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // User ↔ ContactInfo
  User.hasOne(ContactInfo, { foreignKey: 'user_id', as: 'contact_info' });
  ContactInfo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // PaymentMethod ↔ Order
  PaymentMethod.hasMany(Order, { foreignKey: 'payment_method', as: 'orders' });
  Order.belongsTo(PaymentMethod, { foreignKey: 'payment_method', as: 'paymentMethod' });  // Fixed collision here

  // DeliveryMethod ↔ Order
  DeliveryMethod.hasMany(Order, { foreignKey: 'delivery_method', as: 'orders' });
  Order.belongsTo(DeliveryMethod, { foreignKey: 'delivery_method', as: 'deliveryMethod' });

  // Product ↔ Order
  Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });
  Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // User ↔ Order (as Buyer)
  User.hasMany(Order, { foreignKey: 'buyer_id', as: 'buyer_orders' });
  Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

  // User ↔ Order (as Seller)
  User.hasMany(Order, { foreignKey: 'seller_id', as: 'seller_orders' });
  Order.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

  // Product ↔ ProductReview
  Product.hasMany(ProductReview, { foreignKey: 'product_id', as: 'reviews' });
  ProductReview.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // User ↔ ProductReview
  User.hasMany(ProductReview, { foreignKey: 'user_id', as: 'reviews' });
  ProductReview.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // Chat ↔ User (Sender & Receiver)
  User.hasMany(Chat, { foreignKey: 'sender_id', as: 'sent_chats' });
  Chat.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

  User.hasMany(Chat, { foreignKey: 'receiver_id', as: 'received_chats' });
  Chat.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

  // Chat ↔ Product (optional)
  Product.hasMany(Chat, { foreignKey: 'product_id', as: 'product_chats' });
  Chat.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

  // Chat ↔ Order (optional)
  Order.hasMany(Chat, { foreignKey: 'order_id', as: 'order_chats' });
  Chat.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

  // Product ↔ AnimalBreed
  AnimalBreed.hasMany(Product, { foreignKey: 'breed_id', as: 'products' });
  Product.belongsTo(AnimalBreed, { foreignKey: 'breed_id', as: 'breed' });

  // Product ↔ AnimalSpecies
  AnimalSpecies.hasMany(Product, { foreignKey: 'species_id', as: 'products' });
  Product.belongsTo(AnimalSpecies, { foreignKey: 'species_id', as: 'species' });

  // OrderPayment ↔ PaymentMethod
  PaymentMethod.hasMany(OrderPayment, { foreignKey: 'payment_method_id', as: 'order_payments' });
  OrderPayment.belongsTo(PaymentMethod, { foreignKey: 'payment_method_id', as: 'paymentMethod' });

  // OrderDelivery ↔ DeliveryMethod
  DeliveryMethod.hasMany(OrderDelivery, { foreignKey: 'delivery_method', as: 'order_deliveries' });
  OrderDelivery.belongsTo(DeliveryMethod, { foreignKey: 'delivery_method', as: 'deliveryMethod' });

  // Order ↔ OrderPayment
  Order.hasMany(OrderPayment, { foreignKey: 'order_id', as: 'order_payments' });
  OrderPayment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

  // Order ↔ OrderDelivery
  Order.hasMany(OrderDelivery, { foreignKey: 'order_id', as: 'order_deliveries' });
  OrderDelivery.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
};

export default associateModels;
