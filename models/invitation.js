'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userI-FROM', foreignKey: 'from'})
      this.belongsTo(models.user, {as: 'userI-TO', foreignKey: 'to'})
    }
  };
  invitation.init({
    from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'invitation',
  });
  return invitation;
};
