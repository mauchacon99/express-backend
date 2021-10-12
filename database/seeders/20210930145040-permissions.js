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
        roleId: 1,
        moduleId: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 6,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 1,
        moduleId: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 2 = coach
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
      },
      {
        roleId: 2,
        moduleId: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 6,
        status: false,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        moduleId: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 3 = vendor
      {
        roleId: 3,
        moduleId: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 6,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        moduleId: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 4 = company
      {
        roleId: 4,
        moduleId: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 6,
        status: false,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 4,
        moduleId: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // role 5 = personal
      {
        roleId: 5,
        moduleId: 1,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 2,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 3,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 4,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 5,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 6,
        status: false,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 7,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete', 'patch']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 5,
        moduleId: 8,
        status: true,
        methods: JSON.stringify(['get', 'post', 'delete']),
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
