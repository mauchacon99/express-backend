'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class storage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  storage.init({
    name: DataTypes.STRING,
    fileName: DataTypes.STRING,
    fileType: DataTypes.STRING,
    origin: DataTypes.STRING,
    small: DataTypes.STRING,
    medium: DataTypes.STRING,
    large: DataTypes.STRING,
    mimetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'storage',
  });
  return storage;
};