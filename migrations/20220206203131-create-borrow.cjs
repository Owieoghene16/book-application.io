'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      borrowerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Users',
          schema: 'public',
        },
        key: 'id',
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Books',
          schema: 'public',
        },
        key: 'id',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('borrows');
  }
};