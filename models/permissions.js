'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.roles, {as: 'roleP', foreignKey: 'roleId'})
      this.belongsTo(models.modules, {as: 'module', foreignKey: 'moduleId'})
    }
  }
  permissions.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};
