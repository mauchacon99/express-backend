'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  phone.init({
    number: {
      allowNull: false,
      type: Sequelize.STRING
    },
    internationalNumber: {
      allowNull: false,
      type: Sequelize.STRING
    },
    nationalNumber: {
      allowNull: false,
      type: Sequelize.STRING
    },
    countryCode: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dialCode: {
      allowNull: false,
      type: Sequelize.STRING
    }
  }, {
    sequelize,
    modelName: 'phone',
  });
  return phone;
};
