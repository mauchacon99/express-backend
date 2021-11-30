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
      //Role 1 = admin
      {
        roleId: 1,
        moduleId: 1, // /modules
        status: true,
        methods: JSON.stringify(['get', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 2, // /users
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 3, // /permissions
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 4, // /phones
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 5, // /roles
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 6, // /events
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 7, // /locations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 8, // /storage
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 9, // /programs
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 10, // /subprograms
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 11, // /plans
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 12, // /subscribers
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 13, // /experiences
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 14, // /profile
        status: true,
        methods: JSON.stringify(['get', 'post']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 15, // /invitations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete',]),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 16, // /documents
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 2 = coach
      {
        roleId: 2,
        moduleId: 1, // /modules
        status: false,
        methods: JSON.stringify([]),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 2, // /users
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 3, // /permissions
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 4, // /phones
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 5, // /roles
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 6, // /events
        status: false,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 7, // /locations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 8, // /storage
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 9, // /programs
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 10, // /subprograms
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 11, // /plans
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 12, // /subscribers
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 13, // /experiences
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 14, // /profile
        status: true,
        methods: JSON.stringify(['get', 'post']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 15, // /invitations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 16, // /documents
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 3 = vendor
      {
        roleId: 3,
        moduleId: 1, // /modules
        status: false,
        methods: JSON.stringify([]),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 2, // /users
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 3, // /permissions
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 4, // /phones
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 5, // /roles
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 6, // /events
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 7, // /locations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 8, // /storage
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 9, // /programs
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 10, // /subprograms
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 11, // /plans
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 12, // /subscribers
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 13, // /experiences
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 14, // /profile
        status: true,
        methods: JSON.stringify(['get', 'post']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 15, // /invitations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 16, // /documents
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 4 = company
      {
        roleId: 4,
        moduleId: 1, // /modules
        status: false,
        methods: JSON.stringify([]),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 2, // /users
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 3, // /permissions
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 4, // /phones
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 5, // /roles
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 6, // /events
        status: false,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 7, // /locations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 8, // /storage
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 9, // /programs
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 10, // /subprograms
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 11, // /plans
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 12, // /subscribers
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 13, // /experiences
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 14, // /profile
        status: true,
        methods: JSON.stringify(['get', 'post']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 15, // /invitations
        status: false,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 16, // /documents
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 5 = personal
      {
        roleId: 5,
        moduleId: 1, // /modules
        status: false,
        methods: JSON.stringify([]),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 2, // /users
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 3, // /permissions
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 4, // /phones
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 5, // /roles
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 6, // /events
        status: false,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 7, // /locations
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 8, // /storage
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 9, // /programs
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 10, // /subprograms
        status: true,
        methods: JSON.stringify(['get']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 11, // /plans
        status: true,
        methods: JSON.stringify(['get']),
        visible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 12, // /subscribers
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 13, // /experiences
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 14, // /profile
        status: true,
        methods: JSON.stringify(['get', 'post']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 15, // /invitations
        status: false,
        methods: JSON.stringify(['get', 'post', 'delete']),
        visible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 16, // /documents
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        visible: false,
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
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
