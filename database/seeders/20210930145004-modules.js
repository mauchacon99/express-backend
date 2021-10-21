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
        methods: JSON.stringify(['get', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Modules',
        route: '/modules',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Users',
        route: '/users',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Permissions',
        route: '/permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Phones',
        route: '/phones',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Roles',
        route: '/roles',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 6,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'User events',
        route: '/events',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: '<i class="far fa-user"></i>',
        name: 'Locations',
        route: '/locations',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        icon: '<i class="far fa-user"></i>',
        name: 'Storage',
        route: '/storage',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
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
