'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userL', foreignKey: 'userId'})
    }
  }
  location.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lng: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cityName: {
      type: DataTypes.STRING
    },
    countryName: {
      type: DataTypes.STRING
    },
    countryCode: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};
