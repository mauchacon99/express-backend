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
      this.belongsTo(models.Roles, {foreignKey: 'roleId'})
      this.belongsTo(models.Modules, {foreignKey: 'moduleId'})
    }
  };
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
      type: DataTypes.STRING
    },
    methods: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return permissions;
};
