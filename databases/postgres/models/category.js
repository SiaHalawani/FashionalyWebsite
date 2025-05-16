'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      // Example: You can associate this if you link items or wardrobe to categories
      // category.hasMany(models.wardrobecategory, { foreignKey: 'categoryID' });
    }
  }

  category.init({
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
    timestamps: true
  });

  return category;
};
