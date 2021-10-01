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
    await queryInterface.bulkInsert('modules', [
      {
        id: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: null,
        name: 'Auth',
        route: '/auth',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: null,
        name: 'Users',
        route: '/users',
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
    await queryInterface.bulkDelete('modules', null, {});
  }
};
