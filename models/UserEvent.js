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
    userId: DataTypes.STRING,
    event: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserEvent',
  });
  return UserEvent;
};
