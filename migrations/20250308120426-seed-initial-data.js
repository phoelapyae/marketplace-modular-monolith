'use strict';

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [{
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clothing',
        description: 'Fashion apparel and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Books',
        description: 'Books, magazines, and publications',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Home & Kitchen',
        description: 'Home decor and kitchen appliances',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  }
};
