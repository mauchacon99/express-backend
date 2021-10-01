'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('phones', [
      {
        userId: 1,
        number: '3112123658',
        internationalNumber: '+57 311 2123658',
        nationalNumber: '311 2123658',
        countryCode: 'CO',
        dialCode: '+57',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        number: '3112123558',
        internationalNumber: '+57 311 2123558',
        nationalNumber: '311 2123558',
        countryCode: 'CO',
        dialCode: '+57',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('phones', null, {});
  }
};
