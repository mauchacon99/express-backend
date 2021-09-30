'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {as: 'userE', foreignKey: 'userId'})
    }
  };
  UserEvent.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserEvent',
  });
  return UserEvent;
};
