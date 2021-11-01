'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('plans', [
      {
        id: 1,
        users: 5,
        roleId: 2,
        userId: 2,
        status: true,
        programId: 1,
        storageId: 1,
        price: 20.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plans', null, {});
  }
};
