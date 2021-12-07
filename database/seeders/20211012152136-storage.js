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
        origin: faker.image.image(),
        small: faker.image.image(),
        medium: faker.image.image(),
        large: faker.image.image(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fileName: 'Test file doc',
        fileType: '.docx',
        origin: `${process.env.API_URL}/media/test.docx`,
        small: null,
        medium: null,
        large: null,
        userId: 1,
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
