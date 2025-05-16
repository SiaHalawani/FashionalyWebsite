'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    static associate(models) {
      // Collection belongs to a user
      collection.belongsTo(models.user, {
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Collection belongs to many outfits through the correct join table
      collection.belongsToMany(models.outfit, {
        through: 'collectionoutfits',
        foreignKey: 'collectionID',
        otherKey: 'outfitID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  collection.init({
    collectionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    collectionName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'collection',
    tableName: 'collections',
    timestamps: true
  });

  return collection;
};
