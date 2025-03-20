'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shop_metrics', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      shopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      totalViews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalSales: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalRevenue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      productCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      averageRating: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0
      },
      reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      conversionRate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      monthlyRevenue: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      categoryPerformance: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      lastUpdated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex('shop_metrics', ['shopId']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('shop_metrics');
  }
};