'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('programs', [
      {
        id: 1,
        userId: 2,
        description: 'Dolore cillum sunt cupidatat qui est sint sit labore occaecat sint consequat.',
        name: 'Some program name',
        skills: JSON.stringify(['skill1', 'skill2']),
        storageId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        description: 'Dolore cillum sunt cupidatat qui est sint sit labore occaecat sint consequat.',
        name: 'Some program name',
        skills: JSON.stringify(['skill1', 'skill2', 'skill3']),
        storageId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('programs', null, {});
  }
};
