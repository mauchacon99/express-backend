'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {as: 'userPA', foreignKey: 'userId'})
    }
  };
  payment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('transaction') || '{}');
      },
      set: function(value) {
        return this.setDataValue('transaction', JSON.stringify(value));
      }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};
