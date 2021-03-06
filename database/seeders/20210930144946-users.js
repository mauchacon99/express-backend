'use strict'

const faker = require('faker')
const { sanitizeHash } = require('../../middleware/utils')
const fs = require('fs')
const path = require('path')
const publicPath = path.join(process.cwd(),'public')

fs.readdir(`${publicPath}/media`, (err, files) => {
  if (err) throw err
  for (const file of files) {
    if(file !== '.gitkeep')
      fs.unlink(path.join(`${publicPath}/media`, file), (err) => { if (err) throw err })
  }
  fs.copyFile(path.join(publicPath, 'test.docx'), path.join(`${publicPath}/media`, 'test.docx'),
      (err) => { if (err) throw err })
})


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
        skills: null,
        preferences: null,
        instagram: null,
        facebook: null,
        linkedin: null,
        professions: null,
        languages: null,
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
        skills: JSON.stringify(['Leading successfully']),
        preferences: null,
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Designer', 'Computer Engineer']),
        languages: JSON.stringify(['English', 'Spanish']),
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
        skills: JSON.stringify(['Leading successfully', 'Emotional intelligence', 'Health']),
        preferences: null,
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: null,
        languages: JSON.stringify(['English', 'Spanish']),
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
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: JSON.stringify(['pref1', 'pref2']),
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Translator']),
        languages: JSON.stringify(['French', 'Italian', 'English', 'Spanish', 'Korean', 'Japanese']),
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
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: JSON.stringify(['pref1', 'pref2']),
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Doctor']),
        languages: JSON.stringify(['Spanish']),
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
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: null,
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Lawyer']),
        languages: JSON.stringify(['French']),
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
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: JSON.stringify(['pref1', 'pref2']),
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Photographer']),
        languages: JSON.stringify(['English']),
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
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: JSON.stringify(['pref1', 'pref2']),
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Architect']),
        languages: JSON.stringify(['Italian']),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: 'personal 2',
        lastname: 'test 2',
        roleId: 5,
        vendor: null,
        storageId: 1,
        password: '$2b$10$2C37ies.74Yr2sCaPzPkOeH0pPqp0T5s5o/CB1FlueT2mZgQEJoj2', // 123456
        email: 'personal1@personal.com',
        verification: sanitizeHash(faker.datatype.uuid()),
        verified: true,
        description: 'Veniam ex eiusmod officia commodo occaecat exercitation.',
        forgotPassword: false,
        skills: JSON.stringify(['skill1', 'skill2']),
        preferences: JSON.stringify(['pref1', 'pref2']),
        instagram: `@${faker.name.firstName()}`,
        facebook: faker.name.findName(),
        linkedin: faker.name.findName(),
        professions: JSON.stringify(['Architect']),
        languages: JSON.stringify(['Italian']),
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
