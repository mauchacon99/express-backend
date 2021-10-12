'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.location, {as: 'userL', foreignKey: 'userId'})
      this.hasMany(models.phone, {as: 'userP', foreignKey: 'userId'})
      this.hasMany(models.userevents, {as: 'userE', foreignKey: 'userId'})
      this.belongsTo(models.roles, {as: 'roleU', foreignKey: 'roleId'})
    }
  }
  user.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    verification: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('verification', bcrypt.hashSync(value, 10));
      }
    },
    verified: DataTypes.BOOLEAN,
    forgotPassword: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
