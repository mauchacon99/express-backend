'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  permissions.init({
    status: {
      allowNull: false,
      type: Sequelize.STRING
    },
    methods: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return permissions;
};
