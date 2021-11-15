'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const { sanitizeHash } = require('../middleware/utils');

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
      this.hasMany(models.program, {as: 'userPR', foreignKey: 'userId'})
      this.hasMany(models.plan, {as: 'userPL', foreignKey: 'userId'})
      this.hasMany(models.subscriber, {as: 'userS', foreignKey: 'userId'})
      this.hasMany(models.experience, {as: 'userEX', foreignKey: 'userId'})
      this.belongsTo(models.roles, {as: 'roleU', foreignKey: 'roleId'})
      this.belongsTo(models.storage, {as: 'avatar', foreignKey: 'storageId'})
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
        this.setDataValue('verification', sanitizeHash(bcrypt.hashSync(value, 10)));
      }
    },
    vendor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified: DataTypes.BOOLEAN,
    forgotPassword: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    skills: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('skills') || '[]');
      },
      set: function(value) {
        return this.setDataValue('skills', JSON.stringify(value));
      }
    },
    preferences: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('preferences') || '[]');
      },
      set: function(value) {
        return this.setDataValue('preferences', JSON.stringify(value));
      }
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    professions: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('professions') || '[]');
      },
      set: function(value) {
        return this.setDataValue('professions', JSON.stringify(value));
      }
    },
    languages: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('languages') || '[]');
      },
      set: function(value) {
        return this.setDataValue('languages', JSON.stringify(value));
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
