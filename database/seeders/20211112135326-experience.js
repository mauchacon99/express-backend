'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('experiences', [
      {
        userId: 2,
        name: 'Motivation',
        description: 'Et magna irure pariatur id in.',
        experience: '8 years of experience',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: 'Learning',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto asperiores assumenda beatae consectetur cumque delectus dignissimos distinctio dolore dolores, ea fugiat illo ipsum magnam maxime minus non omnis optio placeat possimus qui quia quo rem repellat repudiandae sapiente, sint soluta sunt tempore totam ullam ut voluptas voluptatem voluptates. Accusamus, ex.\n',
        experience: '1 years of experience',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        name: 'Motivation',
        description: 'Et magna irure pariatur id in.',
        experience: '8 years of experience',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('experiences', null, {});
  }
};
