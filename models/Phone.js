'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.User, {as: 'userP', foreignKey: 'userId'})
    }
  };
  Phone.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    internationalNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nationalNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    countryCode: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dialCode: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};