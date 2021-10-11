'use strict';
const {Sequelize} = require("sequelize");
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
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      forgotPassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: process.cwd() + '/public/images/avatar.png',
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
