'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('plans', [
      {
        id: 1,
        name: 'Plan 1',
        users: 5,
        roleId: 5,
        userId: 2,
        status: true,
        programId: 1,
        storageId: 1,
        price: 20.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Plan 2',
        users: 6,
        roleId: 4,
        userId: 3,
        status: true,
        programId: 2,
        storageId: 1,
        price: 30.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plans', null, {});
  }
};
