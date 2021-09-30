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
    await queryInterface.bulkInsert('permissions', [
      {
        roleId: 1,
        moduleId: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
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
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
