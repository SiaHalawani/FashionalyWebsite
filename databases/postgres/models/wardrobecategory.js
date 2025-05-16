'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wardrobecategory extends Model {
    static associate(models) {
      wardrobecategory.belongsTo(models.wardrobe, {
        foreignKey: 'wardrobeID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  wardrobecategory.init({
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    wardrobeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'wardrobecategory',
    tableName: 'wardrobecategories',
  });

  return wardrobecategory;
};
