'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add indexes for better query performance
    await queryInterface.addIndex('products', ['sellerId']);
    await queryInterface.addIndex('products', ['name']);
    await queryInterface.addIndex('orders', ['userId']);
    await queryInterface.addIndex('orders', ['status']);
    await queryInterface.addIndex('order_items', ['orderId']);
    await queryInterface.addIndex('order_items', ['productId']);
    await queryInterface.addIndex('cart_items', ['cartId']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove indexes
    await queryInterface.removeIndex('products', ['sellerId']);
    await queryInterface.removeIndex('products', ['name']);
    await queryInterface.removeIndex('orders', ['userId']);
    await queryInterface.removeIndex('orders', ['status']);
    await queryInterface.removeIndex('order_items', ['orderId']);
    await queryInterface.removeIndex('order_items', ['productId']);
    await queryInterface.removeIndex('cart_items', ['cartId']);
  }
};