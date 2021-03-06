'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userevents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userE', foreignKey: 'userId'})
    }
  };
  userevents.init({
    userId: DataTypes.STRING,
    event: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userevents',
  });
  return userevents;
};
