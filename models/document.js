'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.plan, {as: 'planD', foreignKey: 'planId'})
      this.belongsTo(models.storage, {as: 'storageD', foreignKey: 'storageId'})
    }
  };
  document.init({
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'document',
  });
  return document;
};
