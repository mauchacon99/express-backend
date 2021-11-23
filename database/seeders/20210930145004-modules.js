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
        icon: 'view_module',
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
        icon: 'account_circle',
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
        icon: 'verified_user',
        name: 'Permissions',
        route: '/permissions',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'phone',
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
        icon: 'verified_user',
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
        icon: 'event',
        name: 'User events',
        route: '/events',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'place',
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
        icon: 'cloud_done',
        name: 'Storage',
        route: '/storage',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 9,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'ondemand_video',
        name: 'Programs',
        route: '/programs',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 10,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'auto_awesome_motion',
        name: 'Subprograms',
        route: '/subprograms',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 11,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'receipt_long',
        name: 'Plans',
        route: '/plans',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: true,
      },
      {
        id: 12,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'groups',
        name: 'Subscribers',
        route: '/subscribers',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false,
      },
      {
        id: 13,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        icon: 'brightness_7',
        name: 'Experiences',
        route: '/experiences',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false
      },
      {
        id: 14,
        status: true,
        methods: JSON.stringify(['get', 'post']),
        icon: 'brightness_7',
        name: 'Profile',
        route: '/profile',
        createdAt: new Date(),
        updatedAt: new Date(),
        visible: false
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
