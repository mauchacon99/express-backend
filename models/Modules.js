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
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    methods: {
      allowNull: false,
      type: DataTypes.STRING
    },
    icon: {
      allowNull: true,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    route: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Modules',
  });
  return modules;
};
