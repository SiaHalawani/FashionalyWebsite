'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wardrobeitem extends Model {
    static associate(models) {
      wardrobeitem.belongsTo(models.wardrobecategory, {
        foreignKey: 'categoryID',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      wardrobeitem.hasMany(models.airecommendation, {
        foreignKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      wardrobeitem.belongsToMany(models.outfit, {
        through: 'outfititems',
        foreignKey: 'itemID',
        otherKey: 'outfitID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  wardrobeitem.init({
    itemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    material: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
season: {
  type: DataTypes.ENUM('Winter', 'Summer', 'Spring', 'Autumn', 'All'), 
  allowNull: true,
  defaultValue: 'All' // optional but useful
}, 
    temperatureRange: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    occasion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'unisex'),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    visibility: {
      type: DataTypes.ENUM('private', 'public'),
      allowNull: false,
      defaultValue: 'private'
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wardrobeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'wardrobeitem',
    tableName: 'wardrobeitems'
  });

  return wardrobeitem;
};