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
     await queryInterface.bulkInsert('locations', [
      {
        userId: 1,
        lat: '4.6545875',
        lng: '-74.1009379',
        address: 'Br. La Esmeralda, Teusaquillo, Bogotá, Colombia',
        cityName: 'Bogotá',
        countryName: 'Colombia',
        countryCode: 'co',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        lat: '4.6444889',
        lng: '-74.097912',
        address: 'Parque Urbano El Virrey',
        cityName: 'Bogotá',
        countryName: 'Colombia',
        countryCode: 'co',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('locations', null, {});
     
  }
};
