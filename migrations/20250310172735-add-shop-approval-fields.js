'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('shops', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    });

    await queryInterface.addColumn('shops', 'approvalMessage', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('shops', 'approvedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('shops', 'approvedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('shops', 'isFeatured', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })

    await queryInterface.addIndex('shops', ['approvalStatus']);
    await queryInterface.addIndex('shops', ['isFeatured']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('shops', 'isFeatured');
    await queryInterface.removeColumn('shops', 'approvedBy');
    await queryInterface.removeColumn('shops', 'approvedAt');
    await queryInterface.removeColumn('shops', 'approvalMessage');
    await queryInterface.removeColumn('shops', 'approvalStatus');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_shops_approvalStatus');
  }
};