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
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'admin',
        lastname: 'test',
        roleId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'admin@admin.com',
        verification: 'c454c78d868ebe1aed9fae8fa67286b54226d74126b2adc6d74abf8809a2abd0',
        verified: true,
        forgotPassword: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'coach',
        lastname: 'test',
        roleId: 2,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'coach@coach.com',
        verification: '84ac15417b9b4996f786f6e9eb4f90864f78d264b58d1adeb22970f8724ea24a',
        verified: true,
        forgotPassword: false,
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
    await queryInterface.bulkDelete('users', null, {});
  }
};
