'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('payments', [{
      userId: 1,
      description: 'Cupidatat in ipsum voluptate occaecat fugiat labore.',
      transactionId: 'ipi_1JIdAl2eZvKYlo2Cfr8US8uB',
      transaction: JSON.stringify({
        "id": "ipi_1JIdAl2eZvKYlo2Cfr8US8uB",
        "object": "issuing.transaction",
        "amount": 100,
        "amount_details": {
          "atm_fee": null
        },
        "authorization": "iauth_1JIdAO2eZvKYlo2CNzjj2lif",
        "balance_transaction": "txn_1JIdAm2eZvKYlo2CHfFOwGfr",
        "card": "ic_1JId7I2eZvKYlo2CQcSKF8Df",
        "cardholder": "ich_1JId712eZvKYlo2C0lXNIoYn",
        "created": 1627580251,
        "currency": "usd",
        "dispute": null,
        "livemode": false,
        "merchant_amount": 100,
        "merchant_currency": "usd",
        "merchant_data": {
          "category": "computer_software_stores",
          "category_code": "5734",
          "city": "SAN FRANCISCO",
          "country": "US",
          "name": "STRIPE",
          "network_id": "1234567890",
          "postal_code": "94103",
          "state": "CA"
        },
        "metadata": {
          "order_id": "willfeug@gmail.com"
        },
        "type": "capture",
        "wallet": null
      }),
      amount: 100.0,
      type: 'coach',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payments', null, {});
  }
};
