'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('invitations', [
      {
        from: 2,
        to: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invitations', null, {});
  }
};
