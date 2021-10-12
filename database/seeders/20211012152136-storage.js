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
        fileName: `${faker.random.uuid()}.png`,
        fileType: '.png',
        origin: `http://localhost/media/origin_${faker.random.uuid()}.png`,
        small: `http://localhost/media/small_${faker.random.uuid()}.png`,
        medium: `http://localhost/media/medium_${faker.random.uuid()}.png`,
        large: `http://localhost/media/large_${faker.random.uuid()}.png`,
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
