'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userS', foreignKey: 'userId'})
      this.belongsTo(models.plan, {as: 'planS', foreignKey: 'planId'})
      this.belongsTo(models.subprogram, {as: 'subprogramS', foreignKey: 'subprogramId'})
    }
  };
  subscriber.init({
    planId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subprogramId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'subscriber',
  });
  return subscriber;
};
