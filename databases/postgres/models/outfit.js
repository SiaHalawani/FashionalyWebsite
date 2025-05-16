'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class outfit extends Model {
    static associate(models) {
      // Each outfit belongs to one user
      outfit.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Many-to-many relationship with wardrobeitems
      outfit.belongsToMany(models.wardrobeitem, {
        through: 'outfititems',
        foreignKey: 'outfitID',
        otherKey: 'itemID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Many-to-many relationship with collections
      outfit.belongsToMany(models.collection, {
        through: 'collectionoutfits',
        foreignKey: 'outfitID',
        otherKey: 'collectionID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  outfit.init({
    outfitID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    outfitName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'outfit', // lowercase model name
    tableName: 'outfits',
    timestamps: true // handles createdAt and updatedAt
  });

  return outfit;
};
