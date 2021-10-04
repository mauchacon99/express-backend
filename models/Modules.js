'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Permissions, {as: 'module', foreignKey: 'roleId'})
    }
  };
  Modules.init({
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
  }, {
    sequelize,
    modelName: 'Modules',
  });
  return Modules;
};
