'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reset_password_token: {
        type: Sequelize.STRING,
        unique: true,
      },
      unique_session_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Contact Info table
    await queryInterface.createTable('contact_info', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Animal species
    await queryInterface.createTable('animal_species', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      last_date_modified: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // Animal breeds
    await queryInterface.createTable('animal_breeds', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      animal_species_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'animal_species',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      date_created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      date_modified: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // Products table
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      tax: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      animal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      animal_dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      animal_weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      health_condition: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      breed_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'animal_breeds',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      species_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'animal_species',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Product reviews
    await queryInterface.createTable('product_reviews', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Payment methods
    await queryInterface.createTable('payment_methods', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Delivery methods
    await queryInterface.createTable('delivery_methods', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Order delivery
    await queryInterface.createTable('order_delivery', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      delivery_method: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'delivery_methods',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      delivery_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipping_reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipped_at: Sequelize.DATE,
      processed_at: Sequelize.DATE,
      delivered_at: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // Orders
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      buyer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      contact_info_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'contact_info',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      payment_method: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'payment_methods',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      delivery_method: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'order_delivery',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      order_reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('order_delivery');
    await queryInterface.dropTable('delivery_methods');
    await queryInterface.dropTable('payment_methods');
    await queryInterface.dropTable('product_reviews');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('animal_breeds');
    await queryInterface.dropTable('animal_species');
    await queryInterface.dropTable('contact_info');
    await queryInterface.dropTable('users');
  },
};
