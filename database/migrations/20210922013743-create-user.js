'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      verification: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      forgotPassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vendor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      storageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      skills: {
        allowNull: true,
        type: Sequelize.STRING
      },
      preferences: {
        allowNull: true,
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
    await queryInterface.dropTable('users');
  }
};
