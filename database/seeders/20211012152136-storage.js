'use strict';
const faker = require('faker')

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

    await queryInterface.bulkInsert('storages', [
      {
        id: 1,
        fileName: `${faker.datatype.uuid()}.png`,
        fileType: '.png',
        origin: `${process.env.API_URL}/media/origin_${faker.datatype.uuid()}.png`,
        small: `${process.env.API_URL}/media/small_${faker.datatype.uuid()}.png`,
        medium: `${process.env.API_URL}/media/medium_${faker.datatype.uuid()}.png`,
        large: `${process.env.API_URL}/media/large_${faker.datatype.uuid()}.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('storages', null, {});
  }
};
