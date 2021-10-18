'use strict';

const faker = require('faker');
const { sanitizeHash } = require('../../middleware/utils');

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
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'admin',
        lastname: 'test',
        roleId: 1,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'admin@admin.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Sunt aliqua sit ea velit aliqua nostrud anim labore.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'coach',
        lastname: 'test',
        roleId: 2,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'coach@coach.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Adipisicing sit ut est et proident officia reprehenderit aliqua.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'vendor',
        lastname: 'test',
        roleId: 3,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'vendor@vendor.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Consectetur veniam occaecat anim culpa ipsum minim sint ex culpa.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'company',
        lastname: 'test',
        roleId: 4,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'company@company.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Cupidatat dolor consequat occaecat Lorem cillum dolore excepteur irure exercitation est non reprehenderit mollit.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'personal',
        lastname: 'test',
        roleId: 5,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'personal@personal.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Veniam ex eiusmod officia commodo occaecat exercitation.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'coach1',
        lastname: 'test',
        roleId: 2,
        vendor: 3,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'coach1@coach.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Ut fugiat ex eiusmod irure adipisicing aute nisi commodo ut labore officia amet.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: 'coach2',
        lastname: 'test',
        roleId: 2,
        vendor: 3,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'coach2@coach.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Nulla aliquip consectetur nostrud officia aliqua ea Lorem aute occaecat quis eiusmod sunt.',
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: 'coach3',
        lastname: 'test',
        roleId: 2,
        vendor: 3,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'coach3@coach.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Minim dolor id incididunt sunt tempor est.',
        forgotPassword: false,
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
    await queryInterface.bulkDelete('users', null, {});
  }
};
