'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.subprogram, {as: 'programSP', foreignKey: 'programId'})
      this.hasMany(models.plan, {as: 'programPL', foreignKey: 'programId'})
      this.belongsTo(models.user, {as: 'userPR', foreignKey: 'userId'})
      this.belongsTo(models.storage, {as: 'storagePR', foreignKey: 'storageId'})
    }
  };
  program.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    skills: {
      allowNull: true,
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('skills') || '[]');
      },
      set: function(value) {
        return this.setDataValue('skills', JSON.stringify(value));
      }
    },
    storageId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'program',
  });
  return program;
};
