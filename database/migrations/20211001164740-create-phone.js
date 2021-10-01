'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      internationalNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nationalNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      countryCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dialCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Phones');
  }
};