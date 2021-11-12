'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('experiences', [
      {
        id: 1,
        userId: 2,
        name: 'Motivation',
        description: 'Et magna irure pariatur id in.',
        experience: '8 years of experience',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('experiences', null, {});
  }
};
