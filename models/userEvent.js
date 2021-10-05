'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userE', foreignKey: 'userId'})
    }
  };
  user_events.init({
    userId: {
      type: DataTypes.STRING
    },
    event:{
      type: DataTypes.STRING
    }
    
  }, {
    sequelize,
    modelName: 'user_events',
  });
  return user_events;
};
