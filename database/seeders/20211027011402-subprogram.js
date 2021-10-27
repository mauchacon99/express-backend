'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subprograms', [
      {
        id: 1,
        programId: 1,
        description: 'Sit Lorem irure esse voluptate.',
        position: 1,
        name: 'Some Subprogram name',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subprograms', null, {});
  }
};
