'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.subscriber, {as: 'planS', foreignKey: 'planId'})
      this.belongsTo(models.user, {as: 'userPL', foreignKey: 'userId'})
      this.belongsTo(models.program, {as: 'programPL', foreignKey: 'programId'})
      this.belongsTo(models.storage, {as: 'storagePL', foreignKey: 'storageId'})
    }
  };
  Plan.init({
    users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    programId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};
