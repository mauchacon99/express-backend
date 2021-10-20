'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.permissions, {as: 'module', foreignKey: 'roleId'})
    }
  }
  modules.init({
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    methods: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('methods'));
      },
      set: function(value) {
        return this.setDataValue('methods', JSON.stringify(value));
      }
    },
    icon: {
      allowNull: true,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    route: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    visible: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'modules',
  });
  return modules;
};
