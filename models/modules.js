'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  modules.init({
    status: DataTypes.BOOLEAN,
    methods: DataTypes.STRING,
    icon: DataTypes.STRING,
    name: DataTypes.STRING,
    route: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'modules',
  });
  return modules;
};